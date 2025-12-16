import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import { formatCurrency } from "../../utils/helpers";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const [comfirmPaid, setComfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();

  useEffect(() => {
    setComfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const { checkinMutate, checkinStatus } = useCheckin();
  const { settings, isLoading: settingsLoading } = useSettings();

  if (isLoading || settingsLoading) return <Spinner />;
  console.log(booking);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numOfNights,
  } = booking;

  const breakfastPrice = settings.breakfastPrice * numGuests * numOfNights;

  function handleCheckin() {
    if (!comfirmPaid) return;

    if (addBreakfast)
      checkinMutate({
        bookingId,
        breakfast: {
          extraPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
          hasBreakfast: true,
        },
      });
    else checkinMutate({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => setAddBreakfast(!addBreakfast)}
          >
            用户{guests.fullName}是否需要早餐,额外付费为
            {formatCurrency(breakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id={bookingId}
          checked={comfirmPaid}
          onChange={() => setComfirmPaid(!comfirmPaid)}
          disabled={comfirmPaid}
        >
          {addBreakfast
            ? `确认用户${guests.fullName}已付账${formatCurrency(
                totalPrice + breakfastPrice
              )}(${formatCurrency(totalPrice)} + ${formatCurrency(
                breakfastPrice
              )})`
            : `确认用户${guests.fullName}已付账${formatCurrency(totalPrice)}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!comfirmPaid || checkinStatus === "loading"}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
