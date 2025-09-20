import React from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'College Student',
      content: "I've been using EarnShadow Pro for 6 months and have earned over $2,000! It's perfect for my schedule and the tasks are actually fun to complete. Highly recommended!",
      avatar: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'Mike Chen',
      role: 'Freelancer',
      content: 'The platform is incredibly user-friendly and payments are always on time. I love that I can work whenever I want and still make good money consistently.',
      avatar: 'bg-green-100 text-green-600',
    },
    {
      name: 'Emma Davis',
      role: 'Stay-at-home Mom',
      content: 'EarnShadow Pro has been a game-changer for my family. I can earn extra income while taking care of my kids. The flexibility is absolutely amazing!',
      avatar: 'bg-purple-100 text-purple-600',
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
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">What Our Users Say</h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">Real stories from real people earning with EarnShadow Pro</p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 min-h-[320px] flex flex-col justify-between"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <motion.div
                  className="flex items-center mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className={`w-16 h-16 ${testimonial.avatar} rounded-full flex items-center justify-center mr-6`}>
                    <User size={24} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-lg">{testimonial.role}</div>
                  </div>
                </motion.div>
                
                <motion.p
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  "{testimonial.content}"
                </motion.p>
              </div>
              
              <motion.div
                className="flex text-yellow-400 text-xl"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {[...Array(5)].map((_, starIndex) => (
                  <motion.div
                    key={starIndex}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + starIndex * 0.1 }}
                  >
                    <Star fill="currentColor" size={20} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;