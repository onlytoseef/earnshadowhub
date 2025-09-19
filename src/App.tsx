import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import HomePage from './pages/HomePage';
import PlansPage from './pages/PlansPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminAddTask from './components/AdminAddTask';
import AdminTaskApproval from './components/AdminTaskApproval';
import CustomerTasks from './components/CustomerTasks';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'customer' | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentPage('home');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // For demo purposes - in real app, decode JWT or fetch user data
      const role = localStorage.getItem('userRole') as 'admin' | 'customer';
      setUserRole(role);
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
        onLogout={handleLogout}
      />
      {renderPage()}
      <Footer />
      <StickyCTA />
    </div>
  );
}

export default App;