import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import API from "../utils/api";

export const useUser = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // Get Profile (role, phone, address)
  const useProfile = () => useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await API.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.user;
    },
    staleTime: 1000 * 60 * 10, // Profile rarely changes, keep 10 mins
  });

  // Update Profile
  const updateProfile = useMutation({
    mutationFn: async (payload) => {
      const token = await getToken();
      const { data } = await API.put("/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.user;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["profile"], updatedUser);
    },
  });

  return { useProfile, updateProfile };
};