import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import HomePage from './pages/HomePage';
import PlansPage from './pages/PlansPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminAddTask from './components/AdminAddTask';
import AdminTaskApproval from './components/AdminTaskApproval';
import CustomerTasks from './components/CustomerTasks';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'customer' | null>(null);
  const [planType, setPlanType] = useState<string>('basic');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('planType');
    localStorage.removeItem('currentPage');
    setIsLoggedIn(false);
    setUserRole(null);
    setPlanType('basic');
    setCurrentPage('home');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // For demo purposes - in real app, decode JWT or fetch user data
      const role = localStorage.getItem('userRole') as 'admin' | 'customer';
      const plan = localStorage.getItem('planType') || 'basic';
      setUserRole(role);
      setPlanType(plan);
    }

    // Check for stored currentPage
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(storedPage);
      localStorage.removeItem('currentPage'); // Clear it after use
    }
  }, []);

  const renderPage = () => {
    // If not logged in, only show public pages
    if (!isLoggedIn) {
      switch (currentPage) {
        case 'home':
          return <HomePage />;
        case 'plans':
          return <PlansPage />;
        case 'checkout':
          return <CheckoutPage />;
        case 'about':
          return <AboutPage />;
        case 'contact':
          return <ContactPage />;
        default:
          return <HomePage />;
      }
    }

    // Admin pages
    if (userRole === 'admin') {
      switch (currentPage) {
        case 'add-task':
          return <AdminAddTask />;
        case 'review-tasks':
          return <AdminTaskApproval />;
        default:
          return <AdminAddTask />;
      }
    }

    // Customer pages
    if (userRole === 'customer') {
      // Customers with basic plan can only access plans page and checkout
      if (planType === 'basic') {
        switch (currentPage) {
          case 'plans':
            return <PlansPage />;
          case 'checkout':
            return <CheckoutPage />;
          default:
            return <PlansPage />;
        }
      }
      
      // Customers with paid plans or pending payments can access all customer pages
      switch (currentPage) {
        case 'tasks':
          return <CustomerTasks />;
        case 'plans':
          return <PlansPage />;
        default:
          return <CustomerTasks />;
      }
    }

    return <HomePage />;
  };

  return (
    <div className="bg-white">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        planType={planType}
        onLogout={handleLogout}
      />
      {renderPage()}
      <Footer />
      <StickyCTA />
    </div>
  );
}

export default App;