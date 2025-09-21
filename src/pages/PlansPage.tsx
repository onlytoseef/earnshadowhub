import { motion, Variants } from 'framer-motion';
import { Check, Star, Zap, Crown, Shield, LucideIcon } from 'lucide-react';

interface Plan {
  name: string;
  price: string;
  popular: boolean;
  icon: LucideIcon;
  color: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  description: string;
  period?: string;
}

const PlansPage = () => {
  const handlePlanSelect = (plan: Plan) => {
    console.log('🎯 handlePlanSelect called with plan:', plan);
    // Store plan data in sessionStorage for the checkout page
    sessionStorage.setItem('selectedPlan', JSON.stringify(plan));
    console.log('💾 Plan stored in sessionStorage');
    // Set current page to checkout for App component routing
    localStorage.setItem('currentPage', 'checkout');
    console.log('🔄 Setting currentPage to checkout');
    // Force page reload to trigger App component re-render
    window.location.reload();
  };
  
  const plans: Plan[] = [
    {
      name: 'Starter',
      price: '$60',
      popular: false,
      icon: Shield,
      color: 'from-gray-500 to-gray-600',
      features: [
        'One-time withdrawal of $50',
        'Second withdrawal requires referral',
        'Referral must invest in any plan',
        '8% referral commission',
        'Basic task access',
        'Email support'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      description: 'Perfect for beginners to test the platform',
    },
    {
      name: 'Basic',
      price: '$149',
      popular: true,
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Minimum withdrawal: $50',
        'Maximum withdrawal: $100 per transaction',
        'Referral needed after first withdrawal',
        'Referral must invest to continue',
        '8% referral commission',
        'Premium task access'
      ],
      buttonText: 'Choose Basic',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl',
      description: 'Great for those starting their earning journey',
    },
    {
      name: 'Pro',
      price: '$449',
      popular: false,
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      features: [
        'Withdraw $50 up to 7 times',
        'OR $350 in one transaction',
        'Referral required after limit',
        '8% referral commission',
        'Priority support',
        'Advanced task access'
      ],
      buttonText: 'Choose Pro',
      buttonStyle: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-xl',
      description: 'For serious earners who want more flexibility',
    },
    {
      name: 'Premium',
      price: '$999',
      popular: false,
      icon: Star,
      color: 'from-green-500 to-green-600',
      features: [
        'Withdraw $50 up to 18 times',
        'OR $900 in one transaction',
        'Referral required after limit',
        '8% referral commission',
        'VIP support',
        'Premium task access'
      ],
      buttonText: 'Choose Premium',
      buttonStyle: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl',
      description: 'Perfect for dedicated earning professionals',
    },
    {
      name: 'Elite',
      price: '$2,249',
      popular: false,
      icon: Crown,
      color: 'from-yellow-500 to-yellow-600',
      features: [
        'Withdraw $50 up to 40 times',
        'OR $2,000 in one transaction',
        'Referral required after limit',
        '8% referral commission',
        'Elite support',
        'Priority task access'
      ],
      buttonText: 'Choose Elite',
      buttonStyle: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:shadow-xl',
      description: 'For high-volume earners',
    },
    {
      name: 'Ultimate',
      price: '$4,499',
      popular: false,
      icon: Crown,
      color: 'from-red-500 to-red-600',
      features: [
        'Withdraw $50 up to 80 times',
        'OR $4,000 in one transaction',
        'Referral required after limit',
        '8% referral commission',
        'Ultimate priority support',
        'Exclusive task access'
      ],
      buttonText: 'Choose Ultimate',
      buttonStyle: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-xl',
      description: 'Maximum earning potential and benefits',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl lg:text-6xl font-black text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Investment <span className="text-green-300">Plans</span>
          </motion.h1>
          <motion.p
            className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose your investment plan and start earning. Each plan includes flexible withdrawal options and referral benefits.
          </motion.p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {plans.map((plan, index) => {
              const IconComponent: LucideIcon = plan.icon;
              return (
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
                  
                  <div className="text-center mb-8">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="text-white" size={32} />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-lg">{plan.description}</p>
                  </div>
                  
                  <div className="text-center mb-8">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      {plan.price}
                      <span className="text-xl font-normal text-gray-500">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
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
                    onClick={() => {
                      console.log('Button clicked for plan:', plan.name);
                      handlePlanSelect(plan);
                    }}
                  >
                    {plan.buttonText}
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Compare Plans</h2>
            <p className="text-xl text-gray-600">See what's included in each plan</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-3xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
                <div className="space-y-3">
                  <div className="text-gray-600">10 tasks/day</div>
                  <div className="text-gray-600">Weekly payouts</div>
                  <div className="text-gray-600">Email support</div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Pro</h3>
                <div className="space-y-3">
                  <div className="text-gray-900 font-semibold">Unlimited tasks</div>
                  <div className="text-gray-900 font-semibold">Daily payouts</div>
                  <div className="text-gray-900 font-semibold">Priority support</div>
                  <div className="text-blue-600 font-bold">20% bonus earnings</div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Premium</h3>
                <div className="space-y-3">
                  <div className="text-gray-900 font-semibold">Everything in Pro</div>
                  <div className="text-gray-900 font-semibold">Instant withdrawals</div>
                  <div className="text-gray-900 font-semibold">Account manager</div>
                  <div className="text-purple-600 font-bold">50% bonus earnings</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PlansPage;
