import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroPanel from '../components/HeroPanel';
import Timeline from '../components/Timeline';
import BillComparison from '../components/BillComparison';
import Analytics from '../components/Analytics';
import Insights from '../components/Insights';
import ActionPanel from '../components/ActionPanel';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20,
    }
  }
};

export default function Dashboard({ onLogout, onNavigateToUpload, currentPage }) {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen"
    >
      <Navbar onLogout={onLogout} onNavigateToUpload={onNavigateToUpload} onNavigateToDashboard={() => {}} onNavigateToReports={() => {}} onNavigateToInsights={() => {}} currentPage={currentPage} />
      
      <main className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="mb-8 md:mb-12">
            <HeroPanel />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 md:mb-12">
            <Timeline />
          </motion.div>

          <div className="grid xl:grid-cols-4 gap-8 mb-8 md:mb-12">
            <motion.div variants={itemVariants} className="xl:col-span-3">
              <BillComparison />
            </motion.div>
            
            <motion.div variants={itemVariants} className="xl:col-span-1">
              <ActionPanel />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mb-8 md:mb-12">
            <Analytics />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Insights />
          </motion.div>
        </div>
      </main>

      <footer className="py-8 px-4 md:px-8 border-t border-[#C8B6A6]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8D7B68] flex items-center justify-center">
              <span className="text-white font-serif text-sm font-bold">M</span>
            </div>
            <span className="text-[#8D7B68] text-sm">
              MedClear — Medical Bill Audit Platform
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-[#8D7B68]">
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#1a1a1a] transition-colors">Contact</a>
          </div>
          
          <p className="text-[#8D7B68] text-sm">
            © 2024 MedClear. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
}