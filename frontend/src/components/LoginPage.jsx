import React from 'react';
import { motion } from 'framer-motion';

const LoginPage = ({ onNavigateBack, onNavigateToDashboard }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.1, duration: 0.6 }
    })
  };

  const blobVariants = {
    animate1: {
      x: [0, 100, -50, 0],
      y: [0, 50, 100, 0],
      scale: [1, 1.2, 0.9, 1],
      transition: { duration: 25, repeat: Infinity, ease: "linear" }
    },
    animate2: {
      x: [0, -80, 40, 0],
      y: [0, 120, -30, 0],
      scale: [1, 0.8, 1.1, 1],
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    },
    animate3: {
      x: [0, 30, -70, 0],
      y: [0, -90, 50, 0],
      scale: [1, 1.3, 1, 1],
      transition: { duration: 22, repeat: Infinity, ease: "linear" }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex selection:bg-[#8D7B68] selection:text-white"
      style={{ backgroundColor: '#E3D5CA' }}
    >
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center p-12">
        <motion.div 
          variants={blobVariants}
          animate="animate1"
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 mix-blend-multiply"
          style={{ backgroundColor: '#C8B6A6', top: '10%', left: '5%' }}
        />
        <motion.div 
          variants={blobVariants}
          animate="animate2"
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 mix-blend-multiply"
          style={{ backgroundColor: '#8D7B68', bottom: '15%', right: '10%' }}
        />
        <motion.div 
          variants={blobVariants}
          animate="animate3"
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
          style={{ backgroundColor: '#A4907C', top: '40%', right: '20%' }}
        />

        <div className="relative z-10 text-center">
          <motion.p 
            custom={0}
            variants={textVariants}
            className="text-[1.5rem] font-light tracking-[0.3em] uppercase opacity-60"
            style={{ color: '#8D7B68' }}
          >
            MedClear
          </motion.p>
          <motion.h2 
            custom={1}
            variants={textVariants}
            className="text-[4rem] font-medium leading-tight mt-4 tracking-tight"
            style={{ color: '#8D7B68' }}
          >
            Clarity in healthcare <br /> begins here.
          </motion.h2>
          <motion.div 
            custom={2}
            variants={textVariants}
            className="w-12 h-[1px] mx-auto mt-8 opacity-40"
            style={{ backgroundColor: '#8D7B68' }}
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          variants={cardVariants}
          className="w-full max-w-[450px] p-10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden relative group transition-all"
          style={{ backgroundColor: 'rgba(200, 182, 166, 0.4)' }}
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

          <div className="relative z-10">
            <motion.div 
              custom={0}
              variants={textVariants}
              className="mb-10 text-center lg:text-left"
            >
              <h1 className="text-4xl font-semibold mb-3 tracking-tight" style={{ color: '#8D7B68' }}>
                Welcome to MedClear
              </h1>
              <p className="text-lg opacity-80" style={{ color: '#8D7B68' }}>
                Understand your healthcare costs with clarity
              </p>
            </motion.div>

            <motion.div 
              custom={1}
              variants={textVariants}
              className="space-y-4"
            >
              <motion.button 
                onClick={onNavigateToDashboard}
                whileHover={{ y: -4, boxShadow: '0 10px 20px -10px rgba(141, 123, 104, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 flex items-center justify-center gap-4 rounded-2xl font-semibold text-white transition-all shadow-lg cursor-pointer"
                style={{ backgroundColor: '#8D7B68' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#fff"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#fff"/>
                </svg>
                Sign in with Google
              </motion.button>

              <motion.button 
                onClick={onNavigateToDashboard}
                whileHover={{ y: -2, opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 flex items-center justify-center rounded-2xl font-medium text-sm transition-all cursor-pointer border"
                style={{ borderColor: '#8D7B68', color: '#8D7B68' }}
              >
                Skip for now
              </motion.button>
              
              <div className="py-4 flex items-center gap-4">
                <div className="h-px flex-1 opacity-20" style={{ backgroundColor: '#8D7B68' }} />
                <span className="text-xs uppercase tracking-widest opacity-40 font-bold" style={{ color: '#8D7B68' }}>Secure Encryption</span>
                <div className="h-px flex-1 opacity-20" style={{ backgroundColor: '#8D7B68' }} />
              </div>

              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.6 }}
                 transition={{ delay: 1, duration: 2 }}
                 className="text-center"
              >
                <p className="text-xs tracking-tight" style={{ color: '#8D7B68' }}>
                  By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="fixed top-0 left-0 w-32 h-32 border-t-[1px] border-l-[1px] opacity-10 m-8" style={{ borderColor: '#8D7B68' }} />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b-[1px] border-r-[1px] opacity-10 m-8" style={{ borderColor: '#8D7B68' }} />
    </motion.div>
  );
};

export default LoginPage;
