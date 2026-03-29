import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { useRepairs } from '../../hooks/useRepairs';
import RepairCard from '../RepairCard';

const AdminView = ({ onDelete, isDeleting }) => {
  const { useStats } = useAdmin();
  const { useAllRepairs } = useRepairs();
  const { data: stats } = useStats();
  const { data: allRepairs } = useAllRepairs();

  return (
    /* ✅ pt-32 ensures we clear the Fixed Glass Navbar */
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      
      <div className="mb-10">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Command Center</h2>
        <p className="text-slate-500 text-sm font-bold mt-1 uppercase tracking-[0.2em]">Global Hardware Overview</p>
      </div>

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <StatItem label="Total Lab Requests" value={stats?.totalRepairs} icon="📊" color="text-slate-900" />
        <StatItem label="Awaiting Tech" value={stats?.pending} icon="⏳" color="text-amber-500" />
        <StatItem label="Fixed & Ready" value={stats?.completed} icon="✅" color="text-emerald-500" />
        <StatItem label="Gross Revenue" value={`₹${stats?.totalRevenue}`} icon="💰" isRevenue={true} />
      </div>

      {/* 2. Latest 5 Requests */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
          <h2 className="font-black text-slate-900 uppercase tracking-tight text-xl">Recent Intake</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats?.recentRepairs?.map(repair => (
            <RepairCard 
              key={repair._id} 
              repair={repair} 
              isAdmin={true} 
              onDelete={onDelete} 
              isDeleting={isDeleting}
            />
          ))}
        </div>
      </section>

      {/* 3. Master Repair List */}
      <section>
        <div className="flex items-center gap-4 mb-8">
            <h2 className="font-black text-slate-900 uppercase tracking-tight text-xl whitespace-nowrap">Master Inventory</h2>
            <div className="h-[2px] w-full bg-slate-100" />
        </div>
        <div className="space-y-4">
          {allRepairs?.map(repair => (
            <RepairCard 
              key={repair._id} 
              repair={repair} 
              isAdmin={true} 
              horizontal={true} 
              onDelete={onDelete} 
              isDeleting={isDeleting}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ label, value, icon, color, isRevenue }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
    <span className="text-2xl mb-4 block">{icon}</span>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-3xl font-black tracking-tighter ${isRevenue ? 'text-blue-600' : color}`}>
      {value || 0}
    </p>
  </div>
);

export default AdminView;