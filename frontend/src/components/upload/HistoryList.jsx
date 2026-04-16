import { motion } from 'framer-motion';
import { FileText, Calendar, ChevronRight, ArrowUpRight, Building2 } from 'lucide-react';

const historyData = [
  {
    id: 1,
    name: 'Apollo Hospital - Surgery',
    hospital: 'Apollo Hospitals',
    date: '2024-03-15',
    total: 45800,
    overcharge: 14600,
    overchargePercent: 32,
    status: 'analyzed'
  },
  {
    id: 2,
    name: 'Fortis - Consultation',
    hospital: 'Fortis Healthcare',
    date: '2024-02-28',
    total: 12400,
    overcharge: 2800,
    overchargePercent: 23,
    status: 'analyzed'
  },
  {
    id: 3,
    name: 'Max Hospital - Lab Tests',
    hospital: 'Max Healthcare',
    date: '2024-01-20',
    total: 8500,
    overcharge: 1200,
    overchargePercent: 14,
    status: 'analyzed'
  },
  {
    id: 4,
    name: 'Medanta - MRI Scan',
    hospital: 'Medanta Hospital',
    date: '2023-12-05',
    total: 28500,
    overcharge: 8500,
    overchargePercent: 30,
    status: 'analyzed'
  },
  {
    id: 5,
    name: 'BLK Hospital - Checkup',
    hospital: 'BLK Hospital',
    date: '2023-11-18',
    total: 5200,
    overcharge: 800,
    overchargePercent: 15,
    status: 'analyzed'
  },
];

export default function HistoryList({ onSelectBill }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold" style={{ color: '#1a1a1a' }}>
          Recent Bills
        </h3>
        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          className="flex items-center gap-1 text-xs font-medium" style={{ color: '#8D7B68' }}
        >
          View All
          <ChevronRight size={14} />
        </motion.button>
      </div>

      <div className="overflow-x-auto pb-3 -mx-2 px-2 scrollbar-hide">
        <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
          {historyData.map((bill, index) => (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              whileHover={{ scale: 1.01, y: -2 }}
              onClick={() => onSelectBill?.(bill)}
              className="group relative w-64 flex-shrink-0 p-4 rounded-xl cursor-pointer"
              style={{ 
                background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(200,182,166,0.25))',
                border: '1px solid rgba(141, 123, 104, 0.15)'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(141, 123, 104, 0.15)' }}>
                  <Building2 size={14} className="text-[#8D7B68]" />
                </div>
                <span 
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: bill.overchargePercent > 25 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                    color: bill.overchargePercent > 25 ? '#ef4444' : '#f59e0b'
                  }}
                >
                  {bill.overchargePercent}%
                </span>
              </div>

              <h4 className="text-sm font-semibold mb-1 truncate" style={{ color: '#1a1a1a' }}>
                {bill.name}
              </h4>
              <p className="text-xs text-[#8D7B68]/70 mb-2 flex items-center gap-1">
                <Calendar size={10} />
                {formatDate(bill.date)}
              </p>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-[#8D7B68]/60">Total</p>
                  <p className="text-base font-bold" style={{ color: '#1a1a1a' }}>₹{bill.total.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#8D7B68]/60">Overcharge</p>
                  <p className="text-sm font-semibold" style={{ color: bill.overchargePercent > 25 ? '#ef4444' : '#f59e0b' }}>
                    +₹{bill.overcharge.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-[#8D7B68]/10">
                <div className="h-1.5 rounded-full bg-[#8D7B68]/15 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: bill.overchargePercent > 25 ? '#ef4444' : '#f59e0b' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${bill.overchargePercent}%` }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.08 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </motion.div>
  );
}
