import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  Lightbulb, 
  Building2,
  Bell,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';

const routes = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Upload Bill', icon: Upload, path: '/upload' },
  { name: 'Reports', icon: FileText, path: '/reports' },
  { name: 'Insights', icon: Lightbulb, path: '/insights' },
  { name: 'Government Data', icon: Building2, path: '/gov-data' },
];

export default function Navbar({ onLogout, onNavigateToUpload, onNavigateToDashboard, onNavigateToReports, onNavigateToInsights, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeRoute, setActiveRoute] = useState(currentPage || '/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState(null);

  useEffect(() => {
    const routeMap = {
      'dashboard': '/',
      'upload': '/upload',
      'reports': '/reports',
      'insights': '/insights',
      'gov-data': '/gov-data',
    };
    setActiveRoute(routeMap[currentPage] || '/');
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRouteClick = (route) => {
    setActiveRoute(route.path);
    if (route.name === 'Dashboard' && onNavigateToDashboard) {
      onNavigateToDashboard();
    } else if (route.name === 'Upload Bill' && onNavigateToUpload) {
      onNavigateToUpload();
    } else if (route.name === 'Reports' && onNavigateToReports) {
      onNavigateToReports();
    } else if (route.name === 'Insights' && onNavigateToInsights) {
      onNavigateToInsights();
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 ${
        scrolled 
          ? 'glass-card shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.01 }}
        >
          <div className="w-9 h-9 rounded-lg bg-[#8D7B68] flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="font-bold text-lg" style={{ color: '#1a1a1a' }}>MedClear</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-1">
          {routes.map((route) => (
            <div
              key={route.name}
              className="relative"
              onMouseEnter={() => setHoveredRoute(route.name)}
              onMouseLeave={() => setHoveredRoute(null)}
            >
              <motion.button
                onClick={() => handleRouteClick(route)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeRoute === route.path
                    ? 'text-[#1a1a1a]'
                    : 'text-[#8D7B68] hover:text-[#1a1a1a]'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <route.icon size={16} />
                  {route.name}
                </span>
                <AnimatePresence>
                  {((activeRoute === route.path) || (hoveredRoute === route.name && activeRoute !== route.path)) && (
                    <motion.div
                      layoutId="nav-bg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="absolute inset-0 bg-white/60 rounded-lg"
                    />
                  )}
                </AnimatePresence>
                {activeRoute === route.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#8D7B68] rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg hover:bg-white/40 transition-colors"
          >
            <Bell size={20} className="text-[#8D7B68]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full" />
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-full bg-[#A4907C] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white/50"
          >
            <User size={18} className="text-white" />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="p-2 rounded-lg hover:bg-white/40 transition-colors"
            title="Logout"
          >
            <LogOut size={20} className="text-[#8D7B68]" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-white/40 transition-colors md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-[#8D7B68]" />
            ) : (
              <Menu size={20} className="text-[#8D7B68]" />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="glass-card mt-4 rounded-xl p-4 space-y-2">
              {routes.map((route, index) => (
                <motion.button
                  key={route.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setActiveRoute(route.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeRoute === route.path
                      ? 'bg-[#8D7B68] text-white'
                      : 'text-[#8D7B68] hover:bg-white/40'
                  }`}
                >
                  <route.icon size={18} />
                  {route.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}