import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { status: statusUpdateUser, mutate: mutateUpdateUser } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateCurrentUser({ fullName, avatar, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      /* queryClient.invalidateQueries({ queryKey: "user" }); */
      toast.success("编辑用户信息成功！");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { statusUpdateUser, mutateUpdateUser };
}

export default useUpdateUser;
