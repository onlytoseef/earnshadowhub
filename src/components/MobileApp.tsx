import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Smartphone } from 'lucide-react';

const MobileApp = () => {
  const features = [
    'Offline task completion',
    'Push notifications for new tasks',
    'Real-time earnings tracking',
    'Instant withdrawal requests',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">Earn On-the-Go with Our Mobile App</h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12">Download our mobile app and start earning anywhere, anytime. Complete tasks during your commute, lunch break, or while watching TV.</p>
            
            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle className="text-green-300 mr-4 flex-shrink-0" size={24} />
                  <span className="text-xl text-white">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="bg-black text-white px-8 py-4 rounded-2xl flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-left">
                  <div className="text-sm">Download on the</div>
                  <div className="text-xl font-bold">App Store</div>
                </div>
              </motion.button>
              
              <motion.button
                className="bg-black text-white px-8 py-4 rounded-2xl flex items-center justify-center hover:bg-gray-800 transition-all duration-300 shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-left">
                  <div className="text-sm">Get it on</div>
                  <div className="text-xl font-bold">Google Play</div>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="w-80 h-96 bg-white/10 backdrop-blur-sm rounded-3xl mx-auto p-8 border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-gradient-to-b from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 }}
                    >
                      <Smartphone className="text-white mb-6 mx-auto" size={64} />
                    </motion.div>
                    <div className="text-white font-bold text-xl">EarnShadow Pro App</div>
                    <div className="text-blue-200 text-lg">Coming Soon</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;