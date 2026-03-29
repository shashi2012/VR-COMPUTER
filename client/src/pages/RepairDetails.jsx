import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRepairs } from '../hooks/useRepairs';
import { useAdmin } from '../hooks/useAdmin';
import { useUser } from '../hooks/useUser';
import { motion, AnimatePresence } from 'framer-motion';

const RepairDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { useRepairDetails } = useRepairs();
  const { useProfile } = useUser();
  const adminTools = useAdmin();
  const updateStatus = adminTools.useUpdateStatus(); 

  const { data: repair, isLoading, isError } = useRepairDetails(id);
  const { data: profile } = useProfile();

  const [editData, setEditData] = useState({ repairStatus: '', price: 0 });
  const [selectedImg, setSelectedImg] = useState(null); 

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    if (repair) {
      setEditData({
        repairStatus: repair.repairStatus || 'pending',
        price: repair.price || 0
      });
    }
  }, [repair]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateStatus.mutate({ id, ...editData }, {
      onSuccess: () => alert("VR Lab Records Updated! ✅"),
      onError: (err) => alert("Update failed: " + err.message)
    });
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-32">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (isError || !repair) return (
    <div className="min-h-screen flex items-center justify-center pt-32 text-center">
      <p className="text-red-500 font-black text-xl">RECORD NOT FOUND</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 pt-32 pb-20 font-sans">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[2px] hover:text-blue-600 transition-all"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="bg-slate-950 p-12 text-white relative">
               <div className="relative z-10">
                  <p className="text-blue-500 text-[10px] font-black uppercase tracking-[5px] mb-4">Device Diagnostic</p>
                  {/* Brand (Big) */}
                  <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">{repair.deviceBrand}</h1>
                  {/* Model (Smaller) */}
                  <h2 className="text-2xl font-bold text-slate-400 tracking-tight mt-2 opacity-80 uppercase">{repair.deviceModel}</h2>
               </div>
            </div>

            <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-12">
                {/* ✅ CLIENT INFO FIXED HERE */}
                <DetailItem 
                    label="Client Information" 
                    value={repair.customer?.name} 
                    subValue={repair.customer?.email}
                />
                <DetailItem 
                    label="Problem Reported" 
                    value={repair.issue} 
                    isLongText={true}
                />
              </div>
              <div className="space-y-12">
                <DetailItem label="Reception Date" value={new Date(repair.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })} />
                <DetailItem label="Service Provider" value="VR Computer Labs" subValue="Official Service Center" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Column */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl">
             <p className="text-blue-500 text-[10px] font-black uppercase tracking-[3px] mb-6">Service Invoice</p>
             <h3 className="text-6xl font-black tracking-tighter">₹{repair.price || 0}</h3>
          </div>

          {isAdmin && (
            <div className="bg-white p-10 rounded-[3rem] border border-blue-100 shadow-xl">
              <h3 className="text-slate-900 font-black text-xs uppercase tracking-[3px] mb-8">Admin Tools</h3>
              <form onSubmit={handleUpdate} className="space-y-6">
                <select 
                  value={editData.repairStatus}
                  onChange={(e) => setEditData({...editData, repairStatus: e.target.value})}
                  className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="in-progress">In Repair</option>
                  <option value="completed">Completed</option>
                  <option value="delivered">Delivered</option>
                </select>
                <input 
                  type="number" 
                  value={editData.price}
                  onChange={(e) => setEditData({...editData, price: e.target.value})}
                  className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-black text-xl outline-none"
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[3px]">Update Record</button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, subValue, isLongText }) => (
  <div className="space-y-3">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <div>
      <p className={`font-bold text-slate-900 tracking-tight leading-tight ${isLongText ? 'text-lg italic text-slate-600' : 'text-3xl'}`}>
        {value || 'Loading Name...'}
      </p>
      {subValue && <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">{subValue}</p>}
    </div>
  </div>
);

const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'completed': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    default: return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
  }
};

export default RepairDetails;