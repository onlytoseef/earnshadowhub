import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Globe, TrendingUp } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '2.5M+', label: 'Total Paid Out', prefix: '$' },
    { number: '150K+', label: 'Active Users' },
    { number: '5M+', label: 'Tasks Completed' },
    { number: '150+', label: 'Countries Served' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every decision we make puts our users first. Your success is our success.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from platform security to user experience.',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Creating opportunities for people worldwide to earn income and improve their lives.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology and features.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      description: 'Former tech executive with 15+ years of experience in building scalable platforms.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Expert in distributed systems and security, ensuring our platform is robust and secure.',
      color: 'bg-green-100 text-green-600',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      description: 'Passionate about creating seamless user experiences and operational excellence.',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl lg:text-6xl font-black text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About <span className="text-green-300">EarnShadow Pro</span>
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're on a mission to democratize online earning opportunities and help people around the world achieve financial freedom through flexible work.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6">
                  <Target className="text-white" size={32} />
                </div>
                <h2 className="text-4xl font-black text-gray-900">Our Mission</h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                To create the world's most trusted and accessible platform for online earning, empowering individuals to take control of their financial future through flexible, meaningful work opportunities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe everyone deserves the opportunity to earn extra income on their own terms, whether they're students, parents, freelancers, or anyone looking to supplement their income.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-6">
                  <Users className="text-white" size={32} />
                </div>
                <h2 className="text-4xl font-black text-gray-900">Our Vision</h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                To become the global leader in democratizing work opportunities, creating a world where anyone, anywhere can earn a sustainable income through digital tasks and micro-work.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a future where traditional employment barriers are eliminated, and people have the freedom to work when, where, and how they want.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Our Impact</h2>
            <p className="text-xl text-gray-600">Numbers that tell our story</p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 text-center shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
                  {stat.prefix}{stat.number}
                </div>
                <div className="text-sm lg:text-base font-medium text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind EarnShadow Pro</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl shadow-xl p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`w-24 h-24 ${member.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-blue-600 font-semibold mb-4">{member.role}</div>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-black text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join Our Mission
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be part of the future of work. Start earning with EarnShadow Pro today.
          </motion.p>
          <motion.button
            className="bg-white text-blue-600 px-12 py-5 rounded-xl text-xl font-black hover:bg-gray-50 transition-all duration-300 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ y: 0, scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;