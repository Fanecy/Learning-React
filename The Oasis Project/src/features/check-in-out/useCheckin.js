import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkinMutate, status: checkinStatus } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success("登记入住成功！");
      navigate("-1");
    },
    onError: () => {
      toast.error("登记失败,请重试！");
    },
  });

  return { checkinMutate, checkinStatus };
}

export default useCheckin;
