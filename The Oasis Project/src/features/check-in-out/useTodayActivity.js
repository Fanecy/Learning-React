import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { isLoading, data: today } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: "today-activity",
  });

  return { isLoading, today };
}

export default useTodayActivity;
