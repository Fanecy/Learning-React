import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const queryClient = useQueryClient();
  const { mutate: signUpMutate, status: signUpStatus } = useMutation({
    mutationFn: SignUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("账号成功建立！");
    },
    onError: () => {
      toast.error("账号建立失败，请重试！");
    },
  });

  return { signUpMutate, signUpStatus };
}

export default useSignUp;
