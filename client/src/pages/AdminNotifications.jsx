import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { motion } from 'framer-motion';

const AdminNotifications = () => {
  const navigate = useNavigate();
  const { useStats } = useAdmin();
  const { data: stats, isLoading } = useStats();

  // We filter for "pending" repairs to act as "New Notifications"
  const newRequests = stats?.recentRepairs?.filter(r => r.repairStatus === 'pending') || [];

  if (isLoading) return <div className="p-20 text-center font-black animate-pulse">Scanning for new requests...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 pt-24 min-h-screen">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Inbox</h1>
          <p className="text-gray-400 font-bold text-xs uppercase mt-1 tracking-widest">
            New Service Requests
          </p>
        </div>
        <div className="bg-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-orange-100">
          {newRequests.length} URGENT
        </div>
      </div>

      <div className="space-y-4">
        {newRequests.map((request, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={request._id}
            onClick={() => navigate(`/repair/${request._id}`)}
            className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer flex items-center gap-6"
          >
            {/* Action Icon */}
            <div className="h-14 w-14 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📩
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800 text-lg leading-none">
                  {request.customer?.name}
                </h3>
                <span className="text-[10px] font-black text-gray-300 font-mono">
                  {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-medium mt-1">
                New <span className="text-slate-900 font-bold">{request.deviceBrand}</span> repair request for {request.deviceModel}.
              </p>
              <div className="flex gap-2 mt-3">
                 <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-bold uppercase">
                   {request.device}
                 </span>
              </div>
            </div>

            <div className="text-orange-500 font-black text-xl opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
              →
            </div>
          </motion.div>
        ))}

        {newRequests.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
            <div className="text-4xl mb-4">☕</div>
            <p className="text-slate-400 font-bold">All caught up! No pending requests.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-4 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;