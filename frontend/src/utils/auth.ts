import { clearToken } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    clearToken();
    queryClient.invalidateQueries({
      queryKey: ["meta"],
      exact: true,
      type: "all",
      refetchType: "none",
    });
    navigate({ to: "/login" });
  };
};
