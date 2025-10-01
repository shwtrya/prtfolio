import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Target, Zap, Shield, CheckCircle, Rocket } from 'lucide-react';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  darkBgColor: string;
  earned: boolean;
  date?: string;
}

const AchievementBadges: React.FC = () => {
  const badges: Badge[] = [
    {
      id: 'expert',
      title: 'Tech Expert',
      description: 'Menguasai berbagai teknologi modern',
      icon: Zap,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100',
      darkBgColor: 'dark:bg-yellow-900/30',
      earned: true,
      date: '2024'
    },
    {
      id: 'certified',
      title: 'Certified Professional',
      description: 'Memiliki sertifikasi resmi',
      icon: Shield,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100',
      darkBgColor: 'dark:bg-emerald-900/30',
      earned: true,
      date: '2023'
    },
    {
      id: 'projects',
      title: 'Project Master',
      description: 'Menyelesaikan 50+ proyek',
      icon: Trophy,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100',
      darkBgColor: 'dark:bg-blue-900/30',
      earned: true,
      date: '2024'
    },
    {
      id: 'quality',
      title: 'Quality Driven',
      description: 'Konsisten menghasilkan kualitas terbaik',
      icon: Star,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100',
      darkBgColor: 'dark:bg-purple-900/30',
      earned: true,
      date: '2024'
    },
    {
      id: 'innovator',
      title: 'Innovator',
      description: 'Menciptakan solusi inovatif',
      icon: Rocket,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100',
      darkBgColor: 'dark:bg-red-900/30',
      earned: true,
      date: '2024'
    },
    {
      id: 'goal',
      title: 'Goal Achiever',
      description: 'Mencapai target dengan konsisten',
      icon: Target,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100',
      darkBgColor: 'dark:bg-indigo-900/30',
      earned: true,
      date: '2024'
    },
    {
      id: 'excellence',
      title: 'Excellence Award',
      description: 'Penghargaan untuk keunggulan',
      icon: Award,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100',
      darkBgColor: 'dark:bg-orange-900/30',
      earned: true,
      date: '2024'
    },
    {
      id: 'reliable',
      title: 'Reliable Partner',
      description: 'Partner terpercaya dan andal',
      icon: CheckCircle,
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-100',
      darkBgColor: 'dark:bg-teal-900/30',
      earned: true,
      date: '2024'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Pencapaian & Badge
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Koleksi penghargaan dan pencapaian yang merepresentasikan dedikasi dan keahlian
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className={`${badge.bgColor} ${badge.darkBgColor} rounded-2xl p-6 border-2 ${badge.earned ? 'border-gray-200 dark:border-gray-700' : 'border-gray-300 dark:border-gray-600'} hover:shadow-xl transition-all duration-300`}>
                  <div className={`${badge.earned ? '' : 'opacity-30 grayscale'} transition-all duration-300`}>
                    <div className="flex justify-center mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 rounded-full ${badge.bgColor} ${badge.darkBgColor} flex items-center justify-center ring-4 ring-white dark:ring-gray-800 shadow-lg`}
                      >
                        <Icon className={`w-8 h-8 ${badge.color}`} />
                      </motion.div>
                    </div>

                    <h3 className={`text-center font-bold text-gray-900 dark:text-white mb-2 text-sm md:text-base`}>
                      {badge.title}
                    </h3>

                    <p className="text-center text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {badge.description}
                    </p>

                    {badge.earned && badge.date && (
                      <div className="text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badge.bgColor} ${badge.darkBgColor} ${badge.color}`}>
                          {badge.date}
                        </span>
                      </div>
                    )}
                  </div>

                  {badge.earned && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-center space-x-4 text-white">
              <Trophy className="w-8 h-8" />
              <div className="text-left">
                <p className="text-2xl font-bold">{badges.filter(b => b.earned).length}/{badges.length}</p>
                <p className="text-sm opacity-90">Badges Earned</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementBadges;
