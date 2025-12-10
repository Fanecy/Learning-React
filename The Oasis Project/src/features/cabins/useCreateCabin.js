import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { status: statusCreate, mutate: mutateCreate } = useMutation({
    mutationFn: (data) => addEditCabins(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "cabin" });
      toast.success("创建小屋成功！");
    },
    onError: (err) => toast.error(err.message),
  });

  return { statusCreate, mutateCreate };
}

export default useCreateCabin;
