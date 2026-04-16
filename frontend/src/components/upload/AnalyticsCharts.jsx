import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Percent, Calendar } from 'lucide-react';

function AnimatedBar({ value, maxValue, delay, label, color }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <motion.div
        className="w-full relative rounded-t-md overflow-hidden"
        style={{ height: '100px' }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-t-md"
          style={{ 
            height: `${(value / maxValue) * 100}%`,
            background: `linear-gradient(to top, ${color}dd, ${color}44)`
          }}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        />
      </motion.div>
      <p className="text-xs font-medium" style={{ color: '#1a1a1a' }}>₹{(value / 1000).toFixed(0)}k</p>
      <p className="text-xs text-[#8D7B68]/60">{label}</p>
    </div>
  );
}

function AnimatedLine({ data, delay }) {
  const maxValue = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / maxValue) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative h-24 w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8D7B68" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8D7B68" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M 0 100 ${data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 80;
            return `L ${x} ${y}`;
          }).join(' ')} L 100 100 Z`}
          fill="url(#lineGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay }}
        />
        <motion.polyline
          points={points}
          fill="none"
          stroke="#8D7B68"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

function AnimatedArea({ data, delay }) {
  const maxValue = Math.max(...data);

  return (
    <div className="relative h-24 w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <motion.path
          d={`M 0 100 ${data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 85;
            return `L ${x} ${y}`;
          }).join(' ')} L 100 100 Z`}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay }}
        />
        <motion.polyline
          points={data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 85;
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

export default function AnalyticsCharts() {
  const monthlySpending = [28000, 42000, 35000, 48000, 52000, 38000, 45000, 41000, 55000, 47000, 39000, 52000];
  const overchargeTrend = [3200, 4800, 2900, 5600, 7200, 4100, 5800, 4500, 6800, 5100, 4200, 6400];
  const savingsData = [1200, 1800, 1400, 2100, 2800, 1600, 2200, 1900, 2600, 2000, 1500, 2400];
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const totalSpending = monthlySpending.reduce((a, b) => a + b, 0);
  const totalOvercharge = overchargeTrend.reduce((a, b) => a + b, 0);
  const totalSavings = savingsData.reduce((a, b) => a + b, 0);
  const avgOvercharge = Math.round((totalOvercharge / totalSpending) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold" style={{ color: '#1a1a1a' }}>
          Yearly Analytics
        </h3>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#8D7B68]/10 text-xs font-medium" style={{ color: '#8D7B68' }}>
          <Calendar size={12} />
          2024
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-xl"
          style={{ 
            background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(200,182,166,0.25))',
            border: '1px solid rgba(141, 123, 104, 0.15)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#8D7B68]/15 flex items-center justify-center">
                <DollarSign size={16} className="text-[#8D7B68]" />
              </div>
              <div>
                <p className="text-xs text-[#8D7B68]/70">Total Spending</p>
                <p className="text-base font-bold" style={{ color: '#1a1a1a' }}>₹{(totalSpending / 100000).toFixed(2)}L</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#22c55e] text-xs font-medium">
              <TrendingUp size={12} />
              <span>+12%</span>
            </div>
          </div>
          <AnimatedLine data={monthlySpending} delay={0.6} />
          <div className="flex justify-between mt-1">
            {months.filter((_, i) => i % 3 === 0).map(month => (
              <span key={month} className="text-xs text-[#8D7B68]/50">{month}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="p-4 rounded-xl"
          style={{ 
            background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(200,182,166,0.25))',
            border: '1px solid rgba(141, 123, 104, 0.15)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#ef4444]/15 flex items-center justify-center">
                <TrendingDown size={16} className="text-[#ef4444]" />
              </div>
              <div>
                <p className="text-xs text-[#8D7B68]/70">Overcharge</p>
                <p className="text-base font-bold" style={{ color: '#1a1a1a' }}>₹{(totalOvercharge / 1000).toFixed(0)}k</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#ef4444] text-xs font-medium">
              <TrendingDown size={12} />
              <span>+8%</span>
            </div>
          </div>
          <div className="flex items-end justify-between h-24 gap-0.5">
            {months.map((month, index) => (
              <AnimatedBar 
                key={month}
                value={overchargeTrend[index]}
                maxValue={Math.max(...overchargeTrend)}
                delay={0.65 + index * 0.03}
                label={month}
                color="#ef4444"
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 rounded-xl"
          style={{ 
            background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(200,182,166,0.25))',
            border: '1px solid rgba(141, 123, 104, 0.15)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#22c55e]/15 flex items-center justify-center">
                <Percent size={16} className="text-[#22c55e]" />
              </div>
              <div>
                <p className="text-xs text-[#8D7B68]/70">Total Savings</p>
                <p className="text-base font-bold" style={{ color: '#1a1a1a' }}>₹{(totalSavings / 1000).toFixed(0)}k</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#22c55e] text-xs font-medium">
              <TrendingUp size={12} />
              <span>+24%</span>
            </div>
          </div>
          <AnimatedArea data={savingsData} delay={0.7} />
          <div className="flex justify-between mt-1">
            {months.filter((_, i) => i % 3 === 0).map(month => (
              <span key={month} className="text-xs text-[#8D7B68]/50">{month}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4 flex flex-wrap gap-3"
      >
        {[
          { label: 'Bills Analyzed', value: '47', color: '#8D7B68' },
          { label: 'Avg Overcharge', value: `${avgOvercharge}%`, color: '#ef4444' },
          { label: 'Hospitals', value: '12', color: '#2563eb' },
          { label: 'Success Rate', value: '94%', color: '#22c55e' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            className="flex-1 min-w-[100px] p-3 rounded-lg text-center"
            style={{ 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.6), rgba(200,182,166,0.2))',
              border: '1px solid rgba(141, 123, 104, 0.12)'
            }}
          >
            <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs text-[#8D7B68]/70">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
