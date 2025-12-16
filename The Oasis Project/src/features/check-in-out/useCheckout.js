import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkoutMutate, status: checkoutStatus } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success("退房成功！");
      navigate("-1");
    },
    onError: () => {
      toast.error("退房失败,请重试！");
    },
  });

  return { checkoutMutate, checkoutStatus };
}

export default useCheckout;
