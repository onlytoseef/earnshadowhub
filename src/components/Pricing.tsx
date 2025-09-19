import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      period: '/month',
      popular: false,
      features: [
        'Up to 10 tasks per day',
        'Basic surveys',
        'Weekly payouts',
        'Email support',
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      popular: true,
      features: [
        'Unlimited tasks',
        'Premium surveys',
        'Daily payouts',
        'Priority support',
        '20% bonus earnings',
      ],
      buttonText: 'Upgrade to Pro',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl',
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: '/month',
      popular: false,
      features: [
        'Everything in Pro',
        'Exclusive high-paying tasks',
        'Instant withdrawals',
        'Dedicated account manager',
        '50% bonus earnings',
      ],
      buttonText: 'Go Premium',
      buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600',
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
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Choose Your Plan</h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">Start free and upgrade as you earn more</p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-3xl shadow-xl p-8 lg:p-10 relative ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
              variants={itemVariants}
              whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Star className="mr-1" size={14} fill="currentColor" />
                  Most Popular
                </motion.div>
              )}
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{plan.name}</h3>
              
              <div className="text-5xl font-black text-gray-900 mb-8">
                {plan.price}
                <span className="text-xl font-normal text-gray-500">{plan.period}</span>
              </div>
              
              <ul className="space-y-6 mb-10">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + featureIndex * 0.1 }}
                  >
                    <Check className="text-green-500 mr-4 flex-shrink-0" size={18} />
                    <span className={`text-lg ${
                      feature.includes('bonus') ? 'font-semibold text-blue-600' : ''
                    }`}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.button
                className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 ${plan.buttonStyle}`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;