import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"; // Changed from 'motion/react' to 'framer-motion' for stability
import { SignInButton, SignUpButton, UserButton, useUser as useClerkUser } from "@clerk/clerk-react";
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useAdmin } from '../hooks/useAdmin';

import vrLogo from '../assets/images/308366309_201507432227621_2191632536661436448_n.jpg';

const Navbar = () => {
  const { isSignedIn } = useClerkUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { useProfile } = useUser();
  const { data: profile } = useProfile();
  const isAdmin = profile?.role === 'admin';

  const { useStats } = useAdmin();
  const { data: stats } = useStats();
  
  const pendingCount = stats?.recentRepairs?.filter(r => r.repairStatus === 'pending').length || 0;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Why Us', path: '/why-us' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 w-full z-[110] transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
          
          {/* Left: Logo & Mobile Toggle */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
            >
              <motion.div animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-slate-900" />
              <motion.div animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-4 h-0.5 bg-blue-600" />
              <motion.div animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-slate-900" />
            </button>

            <Link to="/" className="flex-shrink-0">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-2xl border border-white/40 ring-4 ring-blue-500/10 bg-white">
                  <img src={vrLogo} alt="VR Logo" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="font-black text-xl tracking-tighter text-slate-900 leading-none">
                    VR <span className="text-blue-600">COMPUTER</span>
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-[3px] text-slate-400">Patna Bihar</span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Center: Desktop Links (Responsive spacing) */}
          <div className="hidden md:flex items-center justify-center gap-1 w-full max-w-xl">
             {publicLinks.map((link) => (
              <NavLink key={link.name} link={link} active={location.pathname === link.path} />
            ))}
            {isSignedIn && (
              <>
                <NavLink link={{ name: 'Dashboard', path: '/dashboard' }} active={location.pathname === '/dashboard'} />
                <NavLink link={{ name: 'Profile', path: '/profile' }} active={location.pathname === '/profile'} />
              </>
            )}
          </div>

          {/* Right: Auth & Notifications */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {!isSignedIn ? (
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-slate-700 hover:text-blue-600 px-4 transition-all">Login</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-slate-900 transition-all active:scale-95">
                    Join VR
                  </button>
                </SignUpButton>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link to="/admin/notifications" className="relative p-2 rounded-xl hover:bg-blue-50 transition-all group">
                    <motion.span whileHover={{ rotate: 15 }} className="text-xl block">🔔</motion.span>
                    {pendingCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 text-[8px] font-black text-white items-center justify-center">
                          {pendingCount}
                        </span>
                      </span>
                    )}
                  </Link>
                )}
                <div className="p-1 rounded-full border border-blue-100 bg-white/50 shadow-sm">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <React.Fragment>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[101] md:hidden"
            />
            <motion.div
              initial={{ x: -300, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-4 left-4 bottom-4 w-[280px] bg-white/90 backdrop-blur-2xl z-[105] shadow-2xl rounded-[2rem] border border-white/50 p-8 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="mb-10">
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-[4px] mb-2">VR LABS</p>
                   <div className="h-1 w-10 bg-blue-600 rounded-full" />
                </div>
                
                <div className="flex flex-col gap-6">
                  {publicLinks.map((link) => (
                    <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-slate-900 hover:text-blue-600 transition-all">
                      {link.name}
                    </Link>
                  ))}
                  {isSignedIn && (
                    <>
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-slate-900">Dashboard</Link>
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-slate-900">Profile</Link>
                    </>
                  )}
                </div>

                <div className="mt-auto">
                  <Link to="/create-repair" onClick={() => setIsMobileMenuOpen(false)} className="block w-full bg-slate-900 text-white text-center py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-transform">
                    Book Service →
                  </Link>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ link, active }) => (
  <Link to={link.path} className="relative px-4 py-2 group">
    <motion.span
      className={`relative z-10 text-[11px] font-black uppercase tracking-[2px] transition-colors ${
        active ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-900'
      }`}
    >
      {link.name}
    </motion.span>
    {active && (
      <motion.div 
        layoutId="nav-active"
        className="absolute inset-0 bg-blue-50 rounded-xl -z-0"
        transition={{ type: 'spring', duration: 0.5 }}
      />
    )}
  </Link>
);

export default Navbar;