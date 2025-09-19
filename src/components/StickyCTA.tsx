import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const StickyCTA = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.button
        className="bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl font-bold text-lg hover:bg-green-600 transition-all duration-300 flex items-center"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Plus className="mr-2" size={20} />
        Join Now
      </motion.button>
    </motion.div>
  );
};

export default StickyCTA;