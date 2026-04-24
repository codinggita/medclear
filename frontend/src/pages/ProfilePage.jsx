import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Shield, Bell, CreditCard, ChevronRight, Settings, Camera } from 'lucide-react';
import Navbar from '../components/Navbar';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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

export default function ProfilePage({ 
  onLogout, 
  onNavigateToDashboard, 
  onNavigateToUpload, 
  onNavigateToReports, 
  onNavigateToInsights, 
  onNavigateToGovData,
  onNavigateToNotifications,
  currentPage 
}) {
  const user = {
    name: 'Rachit Kakkad',
    email: 'rachit.kakkad@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    joined: 'April 2024',
    avatar: null
  };

  const sections = [
    {
      title: 'Account Settings',
      items: [
        { icon: User, label: 'Personal Information', value: 'Manage your profile details', color: '#8D7B68' },
        { icon: Mail, label: 'Email & Security', value: 'Password, 2FA, and recovery', color: '#2563eb' },
        { icon: Bell, label: 'Notifications', value: 'Alerts and update preferences', color: '#f59e0b', onClick: onNavigateToNotifications },
      ]
    },
    {
      title: 'Healthcare & Billing',
      items: [
        { icon: Shield, label: 'Insurance Details', value: 'Manage policies and providers', color: '#22c55e' },
        { icon: CreditCard, label: 'Payment Methods', value: 'Saved cards and UPI IDs', color: '#8b5cf6' },
      ]
    }
  ];

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen"
      style={{ backgroundColor: '#E3D5CA' }}
    >
      <Navbar 
        onLogout={onLogout} 
        onNavigateToUpload={onNavigateToUpload}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToReports={onNavigateToReports}
        onNavigateToInsights={onNavigateToInsights}
        onNavigateToGovData={onNavigateToGovData}
        onNavigateToProfile={() => {}}
        onNavigateToNotifications={onNavigateToNotifications}
        currentPage={currentPage}
      />

      <main className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Profile Card */}
          <motion.div 
            variants={itemVariants}
            className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8D7B68]/5 rounded-full blur-3xl -mr-20 -mt-20" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="relative">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#8D7B68] to-[#A4907C] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden"
                >
                  <User size={64} className="text-white/80" />
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-white shadow-lg border border-[#8D7B68]/20 text-[#8D7B68]"
                >
                  <Camera size={18} />
                </motion.button>
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-black mb-1" style={{ color: '#1a1a1a' }}>{user.name}</h1>
                <p className="text-[#8D7B68] font-medium mb-4">Member since {user.joined}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 text-xs font-bold text-[#8D7B68] border border-[#8D7B68]/10">
                    <Mail size={14} /> {user.email}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 text-xs font-bold text-[#8D7B68] border border-[#8D7B68]/10">
                    <MapPin size={14} /> {user.location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings Sections */}
          {sections.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants} className="mb-8">
              <h2 className="text-sm uppercase tracking-widest font-black text-[#8D7B68]/60 mb-4 px-2">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.8)' }}
                      onClick={item.onClick}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/20 transition-all text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                          <Icon size={20} style={{ color: item.color }} />
                        </div>
                        <div>
                          <p className="font-bold text-[#1a1a1a]">{item.label}</p>
                          <p className="text-xs text-[#8D7B68]">{item.value}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-[#8D7B68]/40" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Danger Zone */}
          <motion.div variants={itemVariants}>
            <button 
              onClick={onLogout}
              className="w-full p-4 rounded-2xl bg-red-50 text-red-500 font-bold border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              Logout from Account
            </button>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
