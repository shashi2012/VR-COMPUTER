import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useRepairs } from '../../hooks/useRepairs';
import RepairCard from '../RepairCard';
import ProfileSection from './ProfileSection';

const CustomerView = ({ profile, onDelete, isDeleting }) => {
  const navigate = useNavigate();
  const [trackId, setTrackId] = useState(''); 
  
  const { useMyRepairs } = useRepairs();
  const { data: repairs, isLoading } = useMyRepairs();

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackId.trim()) {
      navigate(`/repair/${trackId.trim()}`); 
    }
  };

  return (
    /* ✅ Changed pt-10 to pt-32 to ensure it clears the Glass Navbar */
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20"> 
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Left Side: Repair List */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">My Workspace</h2>
              <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Active Repair Records</p>
            </div>
            
            <button 
              onClick={() => navigate('/create-repair')}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-200 active:scale-95"
            >
              + New Request
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[1,2,3,4].map(i => <div key={i} className="h-40 bg-white/50 animate-pulse rounded-[2rem] border border-slate-100" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {repairs?.map(repair => (
                /* ✅ Pass delete props to RepairCard */
                <RepairCard 
                  key={repair._id} 
                  repair={repair} 
                  onDelete={onDelete} 
                  isDeleting={isDeleting}
                  isAdmin={profile?.role === 'admin'} 
                />
              ))}
              
              {repairs?.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 shadow-inner">
                   <div className="text-4xl mb-4">🛠️</div>
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No repair history found.</p>
                   <button onClick={() => navigate('/services')} className="mt-4 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline">View Services</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Profile & Quick Track */}
        <div className="w-full md:w-80 space-y-6">
          <ProfileSection profile={profile} />
          
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/50 shadow-2xl">
            <h3 className="font-black text-slate-900 mb-4 text-[10px] uppercase tracking-[3px]">Track Hardware</h3>
            <form onSubmit={handleTrack} className="space-y-3">
              <input 
                type="text" 
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="Enter Repair ID..." 
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs font-bold outline-none ring-2 ring-transparent focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
              />
              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[2px] hover:bg-blue-600 transition shadow-xl shadow-slate-200"
              >
                Track Status →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;