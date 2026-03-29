import React from 'react';
import { useNavigate } from 'react-router-dom';

const RepairCard = ({ repair, isAdmin, horizontal, onDelete, isDeleting }) => {
  const navigate = useNavigate();

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // ✅ Stops the card from navigating to details when clicking delete
    onDelete(repair._id);
  };

  return (
    <div 
      onClick={() => navigate(`/repair/${repair._id}`)}
      className={`group relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300 ${
        horizontal ? 'flex justify-between items-center' : 'flex flex-col'
      }`}
    >
      {/* ✅ ADMIN DELETE BUTTON (Top Right) */}
      {isAdmin && onDelete && (
        <button 
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="absolute -top-2 -right-2 p-3 bg-red-50 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white z-20 shadow-lg border border-red-100"
          title="Delete Repair Record"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      )}

      <div>
        <h4 className="font-black text-slate-900 uppercase tracking-tight">
          {repair.deviceBrand} {repair.deviceModel}
        </h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
          {new Date(repair.createdAt).toLocaleDateString()}
        </p>
        {!horizontal && (
          <p className="text-xs text-slate-500 font-medium line-clamp-2 italic">
            "{repair.issue || repair.problemDescription}"
          </p>
        )}
      </div>

      <div className={`flex items-center gap-4 ${horizontal ? '' : 'mt-6 pt-4 border-t border-slate-50 flex justify-between'}`}>
        <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest border ${
          repair.repairStatus === 'completed' 
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
            : 'bg-blue-50 text-blue-600 border-blue-100'
        }`}>
          {repair.repairStatus || 'Pending'}
        </span>
        
        {isAdmin && (
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:underline">
            Manage →
          </span>
        )}
      </div>
    </div>
  );
};

export default RepairCard;