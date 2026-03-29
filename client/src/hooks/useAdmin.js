import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import API from "../utils/api";

export const useAdmin = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // 1. Get Dashboard Stats
  const useStats = () => useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await API.get("/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data;
    },
  });

  // 2. Update Status/Price (Strictly matches your enum)
  const useUpdateStatus = () => useMutation({
    mutationFn: async ({ id, repairStatus, price }) => {
      const token = await getToken();
      const { data } = await API.put(`/repairs/${id}`, 
        { repairStatus, price }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.repair;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["admin", "stats"]);
      queryClient.invalidateQueries(["repairs"]);
      queryClient.invalidateQueries(["repair", variables.id]);
    },
  });

  // 3. Delete Repair (Admin Only - Hard Delete)
  const useDeleteRepair = () => useMutation({
    mutationFn: async (id) => {
      const token = await getToken();
      const { data } = await API.delete(`/repairs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      // Refresh everything to ensure the card disappears everywhere
      queryClient.invalidateQueries(["admin", "stats"]);
      queryClient.invalidateQueries(["repairs"]);
    },
  });

  return { 
    useStats, 
    useUpdateStatus, 
    useDeleteRepair 
  };
};