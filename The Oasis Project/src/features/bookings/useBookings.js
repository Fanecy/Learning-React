import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

function useBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryFn: getBookings,
    queryKey: ["booking"],
  });

  return { bookings, isLoading, error };
}

export default useBookings;
