import { motion } from 'framer-motion';
import { Download, LayoutDashboard, FileText } from 'lucide-react';

import Navbar from '../Navbar';
import CurrentBillCard from '../upload/CurrentBillCard';
import HistoryList from '../upload/HistoryList';
import AnalyticsCharts from '../upload/AnalyticsCharts';
import InsightsPanel from '../upload/InsightsPanel';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

export default function ReportsPage({ onNavigateToDashboard, onNavigateToUpload, onNavigateToInsights, currentPage }) {
  const handleSelectBill = (bill) => {
    console.log('Selected bill:', bill);
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen"
      style={{ backgroundColor: '#E3D5CA' }}
    >
      <Navbar 
        onLogout={onNavigateToDashboard} 
        onNavigateToUpload={onNavigateToUpload}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToInsights={onNavigateToInsights}
        currentPage={currentPage}
      />

      <main className="pt-20 pb-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-xl md:text-2xl font-bold" style={{ color: '#1a1a1a' }}>
                  Analysis Reports
                </h1>
                <p className="text-xs text-[#8D7B68]">View your medical bill analysis results</p>
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onNavigateToUpload}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: '#8D7B68' }}
                >
                  <FileText size={16} />
                  New Upload
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(141, 123, 104, 0.2)',
                    color: '#8D7B68'
                  }}
                >
                  <Download size={16} />
                  Export
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <CurrentBillCard />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <HistoryList onSelectBill={handleSelectBill} />
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <AnalyticsCharts />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <InsightsPanel />
          </motion.div>
        </div>
      </main>

      <footer className="py-6 px-4 md:px-8 border-t border-[#C8B6A6]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#8D7B68]">
          <div className="flex items-center gap-2">
            <span>MedClear - Medical Bill Audit Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
