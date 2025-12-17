import toast from "react-hot-toast";
import { Logout } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const { mutate: logoutMutate, status: logoutStatus } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("已登出！");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("登出失败，请检查网络！");
    },
  });

  return { logoutMutate, logoutStatus };
}

export default useLogout;
