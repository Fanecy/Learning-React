import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteMutate, status: deleteStatus } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success("删除成功！");
      navigate("-1");
    },
    onError: () => {
      toast.error("删除失败,请重试！");
    },
  });

  return { deleteMutate, deleteStatus };
}

export default useDeleteBooking;
