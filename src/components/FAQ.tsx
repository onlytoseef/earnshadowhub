import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How much can I earn with TaskEarn Pro?',
      answer: 'Earnings vary based on the time you invest and tasks you complete. Our users typically earn between $200-$2,000 per month. Top earners who dedicate more time can make even more.',
    },
    {
      question: 'When and how do I get paid?',
      answer: 'Payments are processed weekly for Basic users, daily for Pro users, and instantly for Premium users. You can withdraw to PayPal, bank account, or cryptocurrency wallet once you reach the minimum threshold of $10.',
    },
    {
      question: 'What types of tasks are available?',
      answer: 'We offer various tasks including surveys, data entry, app testing, content moderation, transcription, and research tasks. New tasks are added daily to keep things interesting and maximize earning opportunities.',
    },
    {
      question: 'Is TaskEarn Pro available worldwide?',
      answer: 'Yes! TaskEarn Pro is available in over 150 countries. However, task availability and payment methods may vary by location. Check our country-specific pages for detailed information.',
    },
    {
      question: 'Do I need any special skills or experience?',
      answer: 'No special skills required! Most tasks are designed for anyone to complete. We provide clear instructions and training materials. Some higher-paying tasks may require specific skills, but there are plenty of opportunities for everyone.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl lg:text-2xl text-gray-600">Everything you need to know about earning with TaskEarn Pro</p>
        </motion.div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.button
                className="w-full text-left p-8 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleAccordion(index)}
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
              >
                <span className="text-xl font-bold text-gray-900 pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-gray-500 flex-shrink-0" size={24} />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <p className="text-lg text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;