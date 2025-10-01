import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3 } from 'lucide-react';

interface TypingIndicatorProps {
  isTyping: boolean;
  fieldName: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping, fieldName }) => {
  return (
    <AnimatePresence>
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-xs mt-1"
        >
          <Edit3 size={12} className="animate-pulse" />
          <span className="font-medium">Sedang mengetik {fieldName}...</span>
          <div className="flex space-x-1">
            <motion.div
              className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0 }}
            />
            <motion.div
              className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            />
            <motion.div
              className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypingIndicator;
