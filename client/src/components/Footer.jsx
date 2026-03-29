import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Services', path: '/services' },
      { name: 'Why Us', path: '/why-us' },
      { name: 'About Us', path: '/about' },
      { name: 'Customer Stories', path: '/reviews' },
    ],
    support: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ]
  };

  // Manual SVG Icons to avoid lucide-react export errors
  const socials = [
    { 
      name: 'Instagram', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, 
      url: 'https://www.instagram.com/vrc59892/', 
      color: 'hover:text-pink-500' 
    },
    { 
      name: 'Facebook', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, 
      url: 'https://facebook.com', 
      color: 'hover:text-blue-500' 
    },
    { 
      name: 'Twitter', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>, 
      url: 'https://twitter.com', 
      color: 'hover:text-sky-400' 
    },
    { 
      name: 'Gmail', 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, 
      url: 'mailto:support@vrcomputer.com', 
      color: 'hover:text-red-500' 
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-900/20">V</div>
              <span className="text-2xl font-black tracking-tight text-white uppercase">VR <span className="text-blue-500">COMPUTER</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-slate-500 font-medium">
              Patna's leading experts in certified laptop repairs and motherboard diagnostics. Delivering technical excellence and genuine hardware solutions since 2020.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[2px] mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-blue-500 transition-colors font-semibold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[2px] mb-8">Headquarters</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">📍</span>
                <span>Shop No. 09-10, Sukriti Complex, S P Verma Road<br/> Lodipur, Patna, Bihar 800001</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">📞</span>
                <span className="font-black text-slate-200">+91 [Insert-Phone-Number]</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">🕒</span>
                <span>Mon - Sat: 10AM - 9PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Standards */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[2px] mb-8">Our Standards</h4>
            <div className="p-6 bg-slate-900/40 rounded-3xl border border-slate-800/50 backdrop-blur-sm">
               <p className="text-[10px] font-black text-slate-200 mb-3 flex items-center gap-2">
                 <span className="text-blue-500 text-xs">✓</span> CERTIFIED TECHNICIANS
               </p>
               <p className="text-[10px] font-black text-slate-200 mb-3 flex items-center gap-2">
                 <span className="text-blue-500 text-xs">✓</span> 90-DAY WARRANTY
               </p>
               <p className="text-[10px] font-black text-slate-200 flex items-center gap-2">
                 <span className="text-blue-500 text-xs">✓</span> GENUINE SPARE PARTS
               </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, backgroundColor: '#1e293b' }}
                className={`w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 transition-all ${social.color} border border-slate-800 shadow-xl`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-col md:items-end gap-3 text-center md:text-right">
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-[2px]">
              {footerLinks.support.map((link) => (
                <Link key={link.name} to={link.path} className="hover:text-blue-500 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
            <p className="text-[10px] text-slate-700 font-bold tracking-tight uppercase">
              © {currentYear} VR COMPUTER PATNA. ALL RIGHTS RESERVED.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;