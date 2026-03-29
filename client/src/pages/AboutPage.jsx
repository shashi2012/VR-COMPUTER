import React from 'react';
import { motion } from 'motion/react';

// Assets
import shopFront from '../assets/images/-ac4gcre97h.jpg';
import repairWork from '../assets/images/v-r-computer-patna-laptop-repair-and-services-1x454mh59p.jpg';
import internalShop from '../assets/images/v-r-computer-lodipur-patna-laptop-repair-and-services-t9117anjjq.jpg';

// Brand Logos
import hpLogo from '../assets/logos/hp_logo.png'
import dellLogo from '../assets/logos/Dell.jpg';
import lenovoLogo from '../assets/logos/Lenovo_Global_Corporate_Logo.png';
import appleLogo from '../assets/logos/Apple_logo.jpg';

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const brands = [
    { img: appleLogo, name: "Apple" },
    { img: dellLogo, name: "Dell" },
    { img: hpLogo, name: "HP" },
    { img: lenovoLogo, name: "Lenovo" }
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100">

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-500">
        <div className="absolute inset-0 opacity-90">
          <img src={repairWork} className="w-full h-full object-cover" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-9xl font-black mb-6 tracking-tighter"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-100 to-blue-500">
              VR COMPUTER
              <h1 className="seo-hidden">
                VR Computer Laptop & MacBook Repair in Patna
              </h1>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-400 text-sm md:text-lg font-black uppercase tracking-[0.5em]"
          >
            Patna's Premier Technology Laboratory
          </motion.p>
        </div>
      </section>

      {/* 2. BRAND MARQUEE */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Authorized Service & Spares For</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {brands.map((brand, i) => (
              <img key={i} src={brand.img} className="h-10 md:h-14 object-contain" alt={brand.name} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW: SHOP OVERVIEW SECTION (Strategic Details) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div {...fadeInUp} className="space-y-8">
              <div>
                <h2 className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4">Who We Are</h2>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                  The One-Stop Hub for Patna's Digital Life.
                </h3>
              </div>

              <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-lg">
                <p>
                  Established in the year <span className='bold'>2020</span>, V R Computer in Lodipur, Patna, has emerged as a powerhouse in the Laptop Repair & Services industry. We serve as a critical destination for both local residents and clients from across Bihar seeking specialized hardware intervention.
                </p>
                <p>
                  Our establishment is built on the belief that customer satisfaction is as vital as the technical precision of our repairs. This philosophy has helped us garner a loyal customer base that continues to grow daily.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Certified Chip-Level Experts",
                  "Genuine OEM Spare Parts",
                  "Transparent Pricing Policy",
                  "Post-Repair Warranty Support"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">✓</div>
                    <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative p-4 bg-slate-100 rounded-[3rem]"
            >
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 shadow-2xl">
                <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest">Service Categories</h4>
                <div className="space-y-4">
                  {[
                    "Multi-Brand Laptop Dealers",
                    "Advanced Chip-Level Repair",
                    "HP/Dell/Lenovo Specialist",
                    "Printer & Peripheral Services",
                    "Critical Data Recovery",
                    "Custom PC Architecture"
                  ].map((cat, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-sm font-bold tracking-wide">{cat}</span>
                      <span className="text-blue-500 text-xs font-black">TOP RATED</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed">
                  Every technician at VR Computer is dedicated to achieving the common vision of larger technical goals and restoring hardware to factory standards.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. IMAGE GALLERY */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div {...fadeInUp} className="group">
            <div className="overflow-hidden rounded-[2.5rem] mb-6 bg-slate-100 h-80 shadow-2xl">
              <img src={shopFront} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Showroom" />
            </div>
            <h4 className="text-slate-900 font-black text-lg uppercase tracking-tight mb-3">Modern Showroom</h4>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              Located at SP Verma Road, our showroom offers a diverse range of new and refurbished laptops alongside premium accessories.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="group">
            <div className="overflow-hidden rounded-[2.5rem] mb-6 bg-slate-100 h-80 shadow-2xl">
              <img src={internalShop} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Repair Lab" />
            </div>
            <h4 className="text-slate-900 font-black text-lg uppercase tracking-tight mb-3">Inventory Lab</h4>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              We house an extensive inventory of genuine spare parts, allowing us to offer the fastest same-day repair services in Lodipur.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="group">
            <div className="overflow-hidden rounded-[2.5rem] mb-6 bg-slate-100 h-80 shadow-2xl">
              <img src={repairWork} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Tech Lab" />
            </div>
            <h4 className="text-slate-900 font-black text-lg uppercase tracking-tight mb-3">Component Repair</h4>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              Beyond simple replacements, we perform microscopic soldering to fix complex logic board failures, saving you up to 70% compared to full replacements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US: Trust Metrics */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Laptops Fixed", val: "10,000+" },
            { label: "Repair Warranty", val: "90 Days" },
            { label: "Success Rate", val: "98%" },
            { label: "Pickup & Drop", val: "Available" }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <h5 className="text-3xl md:text-5xl font-black mb-2">{item.val}</h5>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VISIT CENTER: Slim & Modernized Map Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-2 p-12 flex flex-col justify-center text-white">
            <h3 className="text-2xl font-black mb-6 uppercase tracking-widest text-blue-400">Visit Us</h3>
            <div className="space-y-6 mb-8">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Address</p>
                <p className="text-sm font-bold leading-relaxed text-slate-300">
                  SP Verma Road, Beside Sammridhi Complex, Lodipur, Patna - 800001
                </p>
              </div>
              <div className="flex gap-10">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Hours</p>
                  <p className="text-sm font-bold text-slate-300">10 AM — 9 PM</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Support</p>
                  <p className="text-sm font-bold text-slate-300">+91 [Phone]</p>
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/VR+COMPUTER/@25.6103307,85.1370105,17z",
                  "_blank"
                )
              }
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all"
            >
              Open in Maps
            </button>
          </div>
          <div className="lg:col-span-3 h-[350px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.83703972522!2d85.13701057456866!3d25.610330777447324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed590f09173231%3A0x5a7c94b854c1bf4e!2sVR%20COMPUTER!5e0!3m2!1sen!2sin!4v1774172984835!5m2!1sen!2sin"
              className="w-full h-full grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;