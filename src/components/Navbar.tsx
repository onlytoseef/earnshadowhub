import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  userRole?: 'admin' | 'customer' | null;
  onLogout?: () => void;
}

const Navbar = ({ currentPage, onNavigate, isLoggedIn = false, userRole = null, onLogout }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (page: string, sectionId?: string) => {
    if (sectionId && currentPage === 'home') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-20 border-b border-gray-100 shadow-lg'
          : 'bg-white shadow-sm'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">ES</span>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                EarnShadow Pro
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <motion.div
              className="ml-10 flex items-baseline space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                ...(!isLoggedIn ? [
                  { label: 'Home', page: 'home' },
                  { label: 'Plans', page: 'plans' },
                  { label: 'About Us', page: 'about' },
                  { label: 'Contact', page: 'contact' }
                ] : userRole === 'admin' ? [
                  { label: 'Add Task', page: 'add-task' },
                  { label: 'Review Tasks', page: 'review-tasks' },
                  { label: 'Manage Users', page: 'manage-users' }
                ] : [
                  { label: 'Available Tasks', page: 'tasks' },
                  { label: 'My Tasks', page: 'my-tasks' },
                  { label: 'Plans', page: 'plans' },
                  { label: 'Wallet', page: 'wallet' }
                ])
              ].map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavigation(item.page)}
                  className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${currentPage === item.page
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {item.label}
                </motion.button>
              ))}
              {isLoggedIn ? (
                <motion.button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  Logout
                </motion.button>
              ) : (
                <>
                  <motion.button
                    className="text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Link to="/login">Login</Link>
                  </motion.button>
                  <motion.button
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Link to="/signup">Get Started</Link>
                  </motion.button>
                </>
              )}
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-4">
              {[
                ...(!isLoggedIn ? [
                  { label: 'Home', page: 'home' },
                  { label: 'Plans', page: 'plans' },
                  { label: 'About Us', page: 'about' },
                  { label: 'Contact', page: 'contact' },
                  { label: 'Login', page: 'login' }
                ] : userRole === 'admin' ? [
                  { label: 'Add Task', page: 'add-task' },
                  { label: 'Review Tasks', page: 'review-tasks' },
                  { label: 'Manage Users', page: 'manage-users' }
                ] : [
                  { label: 'Available Tasks', page: 'tasks' },
                  { label: 'My Tasks', page: 'my-tasks' },
                  { label: 'Plans', page: 'plans' },
                  { label: 'Wallet', page: 'wallet' }
                ])
              ].map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavigation(item.page)}
                  className={`block w-full text-left py-2 text-base font-semibold transition-colors duration-300 ${currentPage === item.page
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                    }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;