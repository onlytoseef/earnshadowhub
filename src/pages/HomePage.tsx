import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Statistics from '../components/Statistics';
import Security from '../components/Security';
import Testimonials from '../components/Testimonials';
import MobileApp from '../components/MobileApp';
import CTA from '../components/CTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Statistics />
      <Security />
      <Testimonials />
      <MobileApp />
      <CTA />
    </>
  );
};

export default HomePage;