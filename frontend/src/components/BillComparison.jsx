import { motion } from 'framer-motion';
import { FileText, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

const rawBillItems = [
  { name: 'Room Charges (ICU)', original: 18500, expected: 12000, flag: true },
  { name: 'Doctor Consultation', original: 3500, expected: 2500, flag: false },
  { name: 'Medical Supplies', original: 8200, expected: 6500, flag: true },
  { name: 'Lab Tests', original: 4500, expected: 3200, flag: false },
  { name: 'Medications', original: 7600, expected: 4200, flag: true },
];

const structuredData = [
  { category: 'Room & Board', amount: 12000, status: 'verified' },
  { category: 'Professional Fees', amount: 2500, status: 'verified' },
  { category: 'Medical Supplies', amount: 6500, status: 'adjusted' },
  { category: 'Diagnostic Tests', amount: 3200, status: 'verified' },
  { category: 'Pharmaceuticals', amount: 4200, status: 'adjusted' },
];

export default function BillComparison() {
  const totalOriginal = rawBillItems.reduce((sum, item) => sum + item.original, 0);
  const totalExpected = rawBillItems.reduce((sum, item) => sum + item.expected, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#A4907C]/10 to-[#8D7B68]/5 rounded-3xl" />
      
      <div className="relative premium-card rounded-3xl p-6 md:p-10">
        <div className="text-center mb-8">
          <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a]">
            Bill Transformation
          </h3>
          <p className="text-[#8D7B68] mt-2">
            Raw bill converted to structured data
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText size={20} className="text-[#8D7B68]" />
              <h4 className="font-serif text-xl text-[#1a1a1a]">Original Bill</h4>
            </div>

            <div className="space-y-4">
              {rawBillItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    item.flag ? 'bg-[#ef4444]/5 border border-[#ef4444]/20' : 'bg-white/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.flag ? (
                      <AlertCircle size={16} className="text-[#ef4444]" />
                    ) : (
                      <CheckCircle size={16} className="text-[#22c55e]" />
                    )}
                    <span className="text-[#1a1a1a] font-medium text-sm">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#1a1a1a] font-semibold">₹{item.original.toLocaleString()}</span>
                    {item.flag && (
                      <ArrowRight size={14} className="text-[#ef4444]" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#C8B6A6]/30 flex items-center justify-between">
              <span className="text-[#8D7B68] font-medium">Total Charged</span>
              <span className="text-2xl font-serif font-bold text-[#1a1a1a]">
                ₹{totalOriginal.toLocaleString()}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle size={20} className="text-[#22c55e]" />
              <h4 className="font-serif text-xl text-[#1a1a1a]">Structured Data</h4>
            </div>

            <div className="space-y-4">
              {structuredData.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/40"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'verified' ? 'bg-[#22c55e]' : 'bg-[#2563eb]'
                    }`} />
                    <span className="text-[#1a1a1a] font-medium text-sm">{item.category}</span>
                  </div>
                  <span className="text-[#1a1a1a] font-semibold">₹{item.amount.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#C8B6A6]/30 flex items-center justify-between">
              <span className="text-[#8D7B68] font-medium">Expected Cost</span>
              <span className="text-2xl font-serif font-bold text-[#22c55e]">
                ₹{totalExpected.toLocaleString()}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563eb]/10 text-[#2563eb] text-sm font-medium">
            <ArrowRight size={16} />
            Transforming {rawBillItems.filter(i => i.flag).length} inflated items
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}