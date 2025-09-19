import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Shield as UserShield, Award, CheckCircle, Star } from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'SSL Encryption',
      description: 'All data transmitted through our platform is protected with 256-bit SSL encryption, the same standard used by banks.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Shield,
      title: 'Fraud Protection',
      description: 'Advanced AI-powered systems monitor for fraudulent activities 24/7, ensuring a safe environment for all users.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: UserShield,
      title: 'Privacy Protection',
      description: 'Your personal information is never shared with third parties without your explicit consent. Full GDPR compliance.',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const certifications = [
    { icon: CheckCircle, color: 'text-green-500' },
    { icon: Award, color: 'text-blue-500' },
    { icon: Star, color: 'text-yellow-500' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">Your Security is Our Priority</h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12">We use industry-leading security measures to protect your data and earnings.</p>
            
            <div className="space-y-8">
              {securityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <motion.div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent size={24} />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-lg text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-12 lg:p-16"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Award className="text-white" size={48} />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6">SOC 2 Certified</h3>
              <p className="text-lg text-gray-600 mb-8">Independently audited and certified for security, availability, and confidentiality.</p>
              
              <motion.div
                className="flex justify-center space-x-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {certifications.map((cert, index) => {
                  const IconComponent = cert.icon;
                  return (
                    <motion.div
                      key={index}
                      className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center"
                      whileHover={{ y: -4, scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className={cert.color} size={32} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;