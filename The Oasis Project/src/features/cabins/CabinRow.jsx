import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const { status, deleteCabin } = useDeleteCabin();

  const { statusCreate, mutateCreate } = useCreateCabin();

  const trueStatus = status === "loading" || statusCreate === "loading";

  function handleDuplicate() {
    mutateCreate({
      name: `${name}的复制`,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  }

  /*   columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"} */
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fill up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button disabled={trueStatus} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="edit-form">
            <button disabled={trueStatus}>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete-form">
            <button disabled={trueStatus}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-form">
            <ConfirmDelete
              resourceName={name}
              disabled={trueStatus}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Menu.List id={cabinId}>
            <Menu.Button>复制</Menu.Button>
            <Menu.Button>编辑</Menu.Button>
            <Menu.Button>删除</Menu.Button>
          </Menu.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
