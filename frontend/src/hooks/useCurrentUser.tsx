import { useQuery } from "@tanstack/react-query";
import userService from "@/helpers/userSevice";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: userService.getCurrentUser,
  });
};