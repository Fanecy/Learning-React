import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deleteCabinsApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { status, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinsApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      }),
        toast.success("删除小屋成功!");
    },
    onError: (err) => toast.error(err.message),
  });
  return { status, deleteCabin };
}

export default useDeleteCabin;
