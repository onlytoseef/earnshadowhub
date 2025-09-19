import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Zap, TrendingUp, Headphones, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Bank-level security with SSL encryption and verified payment systems. Your data and earnings are completely safe.',
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Work whenever you want, wherever you are. No fixed hours or commitments. Perfect for students and freelancers.',
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Get paid within 24 hours of completing tasks. No waiting periods, no delays. Your money, your time.',
    },
    {
      icon: TrendingUp,
      title: 'Track Earnings',
      description: 'Real-time dashboard to monitor your progress and earnings history. Advanced analytics to optimize your income.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer support team available around the clock. Get help whenever you need it.',
    },
    {
      icon: Award,
      title: 'Rewards Program',
      description: 'Earn bonus points and unlock exclusive tasks with higher payouts. The more you work, the more you earn.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Why Choose TaskEarn Pro?</h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">Everything you need to start earning money online</p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent className="text-white" size={24} />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{feature.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;