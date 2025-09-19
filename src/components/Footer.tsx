import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Shield, Award, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Platform',
      links: [
        'How it Works',
        'Task Categories',
        'Pricing',
        'Success Stories',
        'Referral Program',
      ],
    },
    {
      title: 'Support',
      links: [
        'Help Center',
        'Contact Us',
        'Community',
        'Status Page',
        'Bug Reports',
      ],
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Careers',
        'Press Kit',
        'Terms of Service',
        'Privacy Policy',
      ],
    },
  ];

  const socialIcons = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckSquare className="text-white" size={24} />
              </div>
              <span className="ml-4 text-2xl font-bold">TaskEarn Pro</span>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-lg mb-8">
              The most trusted platform for earning money online through simple tasks and surveys.
            </p>
            
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 shadow-lg"
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
          
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-8">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + linkIndex * 0.05 }}
                  >
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-lg"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col lg:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-gray-400 mb-4 lg:mb-0 text-lg">
            © 2025 TaskEarn Pro. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-8 text-gray-400">
            <motion.span
              className="flex items-center text-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Shield className="mr-3 text-green-400" size={20} />
              SSL Secured
            </motion.span>
            <motion.span
              className="flex items-center text-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Award className="mr-3 text-blue-400" size={20} />
              SOC 2 Certified
            </motion.span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;