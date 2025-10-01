import { supabase } from '../lib/supabase';

function generateSessionId(): string {
  const navigatorInfo = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset(),
    screen.width,
    screen.height,
    screen.colorDepth,
  ].join('|');

  let hash = 0;
  for (let i = 0; i < navigatorInfo.length; i++) {
    const char = navigatorInfo.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return `session_${Math.abs(hash)}_${Date.now().toString(36)}`;
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
}

export async function trackVisitor() {
  try {
    const sessionId = getSessionId();

    const { data: existingSession, error: fetchError } = await supabase
      .from('visitor_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching session:', fetchError);
      return;
    }

    if (existingSession) {
      const { error: updateError } = await supabase
        .from('visitor_sessions')
        .update({
          last_visit: new Date().toISOString(),
          page_views: existingSession.page_views + 1,
        })
        .eq('session_id', sessionId);

      if (updateError) {
        console.error('Error updating session:', updateError);
        return;
      }

      const { error: viewsError } = await supabase.rpc('increment_stat', {
        stat_type_param: 'views'
      });

      if (viewsError) {
        const { data: currentViews } = await supabase
          .from('visitor_stats')
          .select('count')
          .eq('stat_type', 'views')
          .single();

        if (currentViews) {
          await supabase
            .from('visitor_stats')
            .update({ count: currentViews.count + 1 })
            .eq('stat_type', 'views');
        }
      }
    } else {
      const { error: insertError } = await supabase
        .from('visitor_sessions')
        .insert({
          session_id: sessionId,
          first_visit: new Date().toISOString(),
          last_visit: new Date().toISOString(),
          page_views: 1,
        });

      if (insertError) {
        console.error('Error inserting session:', insertError);
        return;
      }

      const incrementPromises = [
        supabase.rpc('increment_stat', { stat_type_param: 'visitors' }),
        supabase.rpc('increment_stat', { stat_type_param: 'views' })
      ];

      const results = await Promise.all(incrementPromises);

      for (let i = 0; i < results.length; i++) {
        if (results[i].error) {
          const statType = i === 0 ? 'visitors' : 'views';
          const { data: currentStat } = await supabase
            .from('visitor_stats')
            .select('count')
            .eq('stat_type', statType)
            .single();

          if (currentStat) {
            await supabase
              .from('visitor_stats')
              .update({ count: currentStat.count + 1 })
              .eq('stat_type', statType);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
}

export async function getVisitorStats() {
  try {
    const { data, error } = await supabase
      .from('visitor_stats')
      .select('*')
      .order('stat_type');

    if (error) {
      console.error('Error fetching visitor stats:', error);
      return { visitors: 0, views: 0 };
    }

    const stats = data.reduce((acc, stat) => {
      acc[stat.stat_type] = stat.count;
      return acc;
    }, {} as Record<string, number>);

    return {
      visitors: stats.visitors || 0,
      views: stats.views || 0,
    };
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    return { visitors: 0, views: 0 };
  }
}

export function subscribeToVisitorStats(callback: (stats: { visitors: number; views: number }) => void) {
  const channel = supabase
    .channel('visitor_stats_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'visitor_stats',
      },
      async () => {
        const stats = await getVisitorStats();
        callback(stats);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
