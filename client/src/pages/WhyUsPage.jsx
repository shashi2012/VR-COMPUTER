import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom'; // Corrected Import

const WhyUsPage = () => {
  const features = [
    { title: "No Fix, No Fee", desc: "If we can't repair your device, you don't pay a single cent. Zero risk.", icon: "✅" },
    { title: "OEM Parts", desc: "We use original or highest-grade equivalent parts for every single repair.", icon: "💎" },
    { title: "Same-Day Service", desc: "80% of our screen and battery repairs are finished in under 4 hours.", icon: "⚡" },
    { title: "90-Day Warranty", desc: "Every repair is backed by our comprehensive 3-month hardware warranty.", icon: "🛡️" },
  ];

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Why Trust VR COMPUTER?
          </h1>
          <p className="text-lg text-slate-600">
            We know your laptop is your lifeline. That's why we’ve built a repair process 
            centered around transparency, speed, and technical excellence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* The Comparison Table */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-10 text-center">The VR Advantage</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-4 px-4 text-slate-400 font-medium">Feature</th>
                  <th className="py-4 px-4 text-blue-400 font-bold">VR COMPUTER</th>
                  <th className="py-4 px-4 text-slate-400 font-medium">Others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-6 px-4 font-medium">Turnaround Time</td>
                  <td className="py-6 px-4 text-green-400 font-semibold">1-24 Hours</td>
                  <td className="py-6 px-4">7-14 Days</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 font-medium">Technician Access</td>
                  <td className="py-6 px-4 text-green-400 font-semibold">Direct Talk to Pro</td>
                  <td className="py-6 px-4">Customer Support Only</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 font-medium">Data Privacy</td>
                  <td className="py-6 px-4 text-green-400 font-semibold">Privacy Guaranteed</td>
                  <td className="py-6 px-4">Often Wiped by Default</td>
                </tr>
                <tr>
                  <td className="py-6 px-4 font-medium">Pricing</td>
                  <td className="py-6 px-4 text-green-400 font-semibold">Upfront & Flat Rate</td>
                  <td className="py-6 px-4">Hidden Diagnostic Fees</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
        >
          <Link to="/services">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all">
              See Our Services
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default WhyUsPage;