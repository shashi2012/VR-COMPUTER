import React from 'react';
import { useUser } from '../hooks/useUser';
import { useAdmin } from '../hooks/useAdmin';
import CustomerView from '../components/dashboard/CustomerView';
import AdminView from '../components/dashboard/AdminView';

const Dashboard = () => {
  const { useProfile } = useUser();
  const { data: profile, isLoading: userLoading } = useProfile();

  // ✅ Get the delete tool from our admin hooks
  const { useDeleteRepair } = useAdmin();
  const deleteMutation = useDeleteRepair();

  const handleDelete = async (repairId) => {
    if (window.confirm("CRITICAL: Are you sure you want to PERMANENTLY delete this repair record from the database?")) {
      try {
        await deleteMutation.mutateAsync(repairId);
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  if (userLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {profile?.role === 'admin' ? (
        /* ✅ Pass delete props to AdminView */
        <AdminView 
          onDelete={handleDelete} 
          isDeleting={deleteMutation.isPending} 
        />
      ) : (
        /* ✅ Pass delete props to CustomerView (if you want them to see the button) 
           Alternatively, omit them if only Admin should delete. */
        <CustomerView profile={profile} />
      )}
    </div>
  );
};

export default Dashboard;