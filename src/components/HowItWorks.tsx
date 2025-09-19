import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CheckSquare, DollarSign } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: '1. Sign Up',
      description: 'Create your free account in less than 2 minutes. No hidden fees or setup costs required. Get instant access to our task marketplace.',
    },
    {
      icon: CheckSquare,
      title: '2. Do Tasks',
      description: 'Complete surveys, data entry, app testing, and other simple online tasks at your own pace. Work from anywhere, anytime.',
    },
    {
      icon: DollarSign,
      title: '3. Get Paid',
      description: 'Receive payments directly to your PayPal, bank account, or crypto wallet. Fast, secure, and reliable payments guaranteed.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">How It Works</h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">Start earning in just three simple steps</p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent className="text-white" size={32} />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">{step.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;