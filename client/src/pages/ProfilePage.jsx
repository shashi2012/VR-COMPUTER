import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../hooks/useUser.js';

const ProfilePage = () => {
  const { useProfile, updateProfile } = useUser();
  const { data: user, isLoading, isError } = useProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ phone: '', address: '' });

  useEffect(() => {
    if (user) {
      setFormData({ 
        phone: user.phone || '', 
        address: user.address || '' 
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile.mutate(formData, {
      onSuccess: () => {
        setIsEditing(false);
        alert("Profile Sync Successful! ✅");
      },
    });
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Profile...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500 font-black uppercase text-xs tracking-widest">
      Data Retrieval Error.
    </div>
  );

  return (
    /* ✅ Changed flex items-center to pt-32 to fix the Navbar overlap */
    <div className="min-h-screen bg-slate-50 flex justify-center pt-32 pb-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full h-fit bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100"
      >
        {/* Header Section - Changed to VR Blue */}
        <div className="bg-slate-900 p-10 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-24 h-24 bg-blue-600 rounded-[2rem] mx-auto mb-6 border-4 border-white/10 flex items-center justify-center text-white text-4xl font-black shadow-2xl">
              {user.name?.charAt(0) || 'U'}
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">{user.name}</h2>
            <p className="text-blue-400 text-[10px] uppercase tracking-[3px] mt-2 font-black">
              {user.role} Verified
            </p>
          </div>
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        </div>

        {/* Content Section */}
        <div className="p-10">
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                key="view"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-8"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Identity</label>
                  <p className="text-slate-900 font-bold text-lg">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Line</label>
                  <p className="text-slate-900 font-bold text-lg">{user.phone || "No phone linked"}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dispatch Address</label>
                  <p className="text-slate-600 font-medium leading-relaxed italic">
                    {user.address || "No address on file"}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-4 bg-slate-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                  Edit Profile →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="edit"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Phone Number</label>
                  <input
                    type="text"
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-slate-900"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="e.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Full Address</label>
                  <textarea
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition font-bold text-slate-900 resize-none"
                    rows="3"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="House No, Street, City..."
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateProfile.isPending}
                    className="flex-1 px-4 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 disabled:opacity-50 transition shadow-xl shadow-blue-100"
                  >
                    {updateProfile.isPending ? 'Syncing...' : 'Save Sync'}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;