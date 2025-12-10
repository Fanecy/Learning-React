import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { status: statusEdit, mutate: mutateEdit } = useMutation({
    mutationFn: ({ cabinData, cabinId }) => addEditCabins(cabinData, cabinId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "cabin" });
      toast.success("编辑小屋成功！");
    },
    onError: (err) => toast.error(err.message),
  });

  return { statusEdit, mutateEdit };
}

export default useEditCabin;
