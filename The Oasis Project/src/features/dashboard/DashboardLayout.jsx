import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, bookings } = useRecentBookings();

  const { isLoading: isLoading2, confirmedStays } = useRecentStays();

  if (isLoading || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>数据</div>
      <div>今日运营动态</div>
      <div>入住时长</div>
      <div>营收数据</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
