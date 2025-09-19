import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Play, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Earn Money Online by<br />
            <motion.span 
              className="text-green-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Completing Simple Tasks
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of users who are earning extra income by completing surveys, micro-tasks, and online activities. Start earning today with our trusted platform.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              className="bg-white text-blue-600 px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl flex items-center"
              whileHover={{ y: -3, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ y: 0, scale: 0.98 }}
            >
              <Rocket className="mr-3" size={20} />
              Start Earning Now
            </motion.button>
            
            <motion.button
              className="border-2 border-white text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.98 }}
            >
              <Play className="mr-3" size={20} />
              Purchase Plan
            </motion.button>
          </motion.div>
          
          {/* Statistics Section */}
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {[
                  { number: '$2.5M+', label: 'Total Paid Out', delay: 0.1 },
                  { number: '150K+', label: 'Active Users', delay: 0.2 },
                  { number: '4.8', label: 'User Rating', delay: 0.3, icon: <Star className="inline ml-1" size={20} fill="currentColor" /> },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-center border border-white/10 hover:bg-white/15 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + stat.delay }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2">
                      {stat.number}{stat.icon}
                    </div>
                    <div className="text-sm lg:text-base font-medium text-blue-100">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;