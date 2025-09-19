import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 99.9]);

  const stats = [
    { number: 2500000, label: 'Total Payouts', prefix: '$', suffix: '' },
    { number: 150000, label: 'Active Users', prefix: '', suffix: '' },
    { number: 5000000, label: 'Tasks Completed', prefix: '', suffix: '' },
    { number: 99.9, label: 'Uptime', prefix: '', suffix: '%' },
  ];

  useEffect(() => {
    if (!isInView) return;

    const animateNumbers = () => {
      stats.forEach((stat, index) => {
        let startValue = 0;
        const endValue = stat.number;
        const duration = 2000;
        const increment = endValue / (duration / 16);

        const timer = setInterval(() => {
          startValue += increment;
          if (startValue >= endValue) {
            startValue = endValue;
            clearInterval(timer);
          }
          
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = startValue;
            return newStats;
          });
        }, 16);
      });
    };

    const timeout = setTimeout(animateNumbers, 500);
    return () => clearTimeout(timeout);
  }, [isInView]);

  const formatNumber = (num: number, index: number) => {
    const stat = stats[index];
    if (index === 0) { // Total payouts
      return `${stat.prefix}${(num / 1000000).toFixed(1)}M+`;
    } else if (index === 1) { // Active users
      return `${Math.ceil(num / 1000)}K+`;
    } else if (index === 2) { // Tasks completed
      return `${(num / 1000000).toFixed(0)}M+`;
    } else { // Uptime
      return `${num.toFixed(1)}${stat.suffix}`;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Trusted by Thousands</h2>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">Join our growing community of successful earners worldwide</p>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/10 hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              <motion.div
                className="text-3xl lg:text-4xl font-black text-white mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1, type: "spring", bounce: 0.4 }}
              >
                {formatNumber(animatedStats[index], index)}
              </motion.div>
              <div className="text-sm lg:text-base font-medium text-blue-100">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;