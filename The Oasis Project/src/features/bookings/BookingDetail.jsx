import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkoutMutate, checkoutStatus } = useCheckout();
  const { deleteMutate, deleteStatus } = useDeleteBooking();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  const { id: bookingId, status: bookingStatus } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.cabinID}</Heading>
          <Tag type={statusToTagName[bookingStatus]}>
            {bookingStatus.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          返回
        </Button>

        <Modal>
          <Modal.Open opens={"delete"}>
            <Button variation={"danger"} icon={<HiTrash />}>
              删除信息
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={bookingId}
              disabled={deleteStatus === "loading"}
              onConfirm={() => deleteMutate(bookingId)}
            />
          </Modal.Window>
        </Modal>

        {bookingStatus === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            登记入住
          </Button>
        )}

        {bookingStatus === "checked-in" && (
          <Button
            onClick={() => {
              checkoutMutate({ bookingId });
            }}
            disabled={checkoutStatus === "loading"}
          >
            退房登记
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
