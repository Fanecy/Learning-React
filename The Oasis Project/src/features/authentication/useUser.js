import { useQuery } from "@tanstack/react-query";
import { GetCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: () => GetCurrentUser(),
    queryKey: ["user"],
  });

  return { user, isLoading, isAuth: user?.role === "authenticated" };
}

export default useUser;
