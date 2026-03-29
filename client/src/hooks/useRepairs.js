import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import API from "../utils/api";

export const useRepairs = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // 1. Customer: Get my repairs
  const useMyRepairs = () => useQuery({
    queryKey: ["repairs", "my"],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await API.get("/repairs/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.repairs;
    },
  });

  // 2. Admin: Get all repairs
  const useAllRepairs = () => useQuery({
    queryKey: ["repairs", "all"],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await API.get("/repairs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.repairs;
    },
  });

  // 3. Global: Get single repair details
  const useRepairDetails = (id) => useQuery({
    queryKey: ["repairs", id],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await API.get(`/repairs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    enabled: !!id,
  });

  // 4. Customer: Create repair (handles FormData for images)
  const createRepair = useMutation({
    mutationFn: async (formData) => {
      const token = await getToken();
      const { data } = await API.post("/repairs", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        },
      });
      return data.repair;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["repairs", "my"]);
    },
  });

  return { useMyRepairs, useAllRepairs, useRepairDetails, createRepair };
};