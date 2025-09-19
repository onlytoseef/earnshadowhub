import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, HelpCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl lg:text-6xl font-black text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Start Earning?
        </motion.h2>
        
        <motion.p
          className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of users who are already earning extra income with TaskEarn Pro. Start your journey today!
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="bg-white text-blue-600 px-12 py-5 rounded-xl text-xl font-black hover:bg-gray-50 transition-all duration-300 shadow-2xl flex items-center"
            whileHover={{ y: -3, scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            whileTap={{ y: 0, scale: 0.95 }}
          >
            <Rocket className="mr-3" size={24} />
            Start Earning Now
          </motion.button>
          
          <motion.button
            className="border-2 border-white text-white px-12 py-5 rounded-xl text-xl font-black hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ y: 0, scale: 0.95 }}
          >
            <HelpCircle className="mr-3" size={24} />
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;