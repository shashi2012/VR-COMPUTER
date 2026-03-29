import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';

const ServicesPage = () => {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const services = [
    { id: 1, title: "Screen Replacement", price: "$89+", description: "Cracked or flickering display? We replace LCD/OLED panels for all major brands.", icon: "🖥️", features: ["Original Grade", "1-Hour Turnaround"] },
    { id: 2, title: "Battery & Power", price: "$59+", description: "Laptop not holding a charge? We provide high-capacity battery replacements.", icon: "🔋", features: ["Genuine Parts", "90-Day Warranty"] },
    { id: 3, title: "Liquid Recovery", price: "Diag Req.", description: "Spilled coffee or water? Ultrasonic cleaning to save your data and device.", icon: "☕", features: ["Board Cleaning", "Data Focus"] },
    { id: 4, title: "Performance", price: "$49+", description: "SSD upgrades, RAM expansions, and full OS optimization services.", icon: "🚀", features: ["5x Faster Boot", "Data Migration"] },
    { id: 5, title: "Input Devices", price: "$65+", description: "Sticky keys or unresponsive trackpad? Full assembly replacements available.", icon: "⌨️", features: ["Dust Cleaning", "OEM Parts"] },
    { id: 6, title: "Logic Board", price: "Quote", description: "Advanced microsoldering for complex issues like no power or GPU failure.", icon: "🔬", features: ["Microsoldering", "Expert Techs"] }
  ];

  // ✅ Fix for the Back Button Redirect Loop
  const handleBooking = (e) => {
    if (!isSignedIn) {
      e.preventDefault(); // Stop navigation to protected route
      openSignIn({
        fallbackRedirectUrl: "/create-repair", // Redirect here after successful login
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight"
          >
            Our Repair <span className="text-blue-600">Services</span>
          </motion.h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm font-medium leading-relaxed">
            Laboratory-grade precision for every device. Select a specialized service to begin.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[1.5rem] p-6 shadow-md shadow-slate-200/40 border border-slate-100 flex flex-col group transition-all"
            >
              <div className="text-2xl mb-5 bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                {service.icon}
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-md font-black text-slate-900 tracking-tight leading-tight">
                  {service.title}
                </h3>
                <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                  {service.price}
                </span>
              </div>

              <p className="text-slate-500 text-[13px] font-medium leading-snug mb-5 grow">
                {service.description}
              </p>

              <ul className="grid grid-cols-2 gap-2 mb-6 border-t border-slate-50 pt-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    <span className="text-blue-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* ✅ Link now triggers handleBooking to prevent history trapping */}
              <Link to="/create-repair" onClick={handleBooking}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[1.5px] hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
                >
                  Book Service →
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-blue-600 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-100"
        >
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black mb-1">Custom Hardware Issue?</h2>
            <p className="text-blue-100 text-xs font-medium opacity-80">We handle specialized workstation and server repairs too.</p>
          </div>
          <a href="mailto:support@quickfixlabs.com" className="bg-white text-blue-600 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[1.5px] hover:bg-blue-50 transition-all">
            Contact Lab
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default ServicesPage;