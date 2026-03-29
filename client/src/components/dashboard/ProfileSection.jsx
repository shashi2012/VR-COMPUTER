import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { motion } from 'motion/react';

const ProfileSection = ({ profile }) => {
  const { updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  // Local state to handle form inputs
  const [formData, setFormData] = useState({
    phone: profile?.phone || '',
    address: profile?.address || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile.mutate(formData, {
      onSuccess: () => {
        setIsEditing(false);
        alert("Profile updated successfully! ✅");
      },
      onError: (err) => {
        alert("Update failed: " + err.message);
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-slate-800 text-lg">My Profile</h3>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition"
        >
          {isEditing ? 'CANCEL' : 'EDIT'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Name & Email (Static from Clerk/DB) */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Full Name</p>
          <p className="text-sm font-semibold text-slate-700">{profile?.name || 'N/A'}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Email Address</p>
          <p className="text-sm font-semibold text-slate-700">{profile?.email || 'N/A'}</p>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-blue-600 uppercase">Phone Number</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Enter 10 digit number"
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm outline-none ring-2 ring-blue-100 focus:ring-blue-500 transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-blue-600 uppercase">Shipping Address</label>
              <textarea 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Street, City, Zip Code"
                rows="3"
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm outline-none ring-2 ring-blue-100 focus:ring-blue-500 transition resize-none"
              />
            </div>
            <button 
              type="submit"
              disabled={updateProfile.isPending}
              className="w-full bg-slate-800 text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-slate-200 hover:bg-black transition"
            >
              {updateProfile.isPending ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          </form>
        ) : (
          <>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Phone</p>
              <p className="text-sm font-semibold text-slate-700">{profile?.phone || 'Not set'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Address</p>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed">{profile?.address || 'No address saved'}</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileSection;