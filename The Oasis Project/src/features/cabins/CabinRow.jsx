import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";

const FullWidth = styled.div`
  grid-column: 1 / -1;
  padding: 1.6rem 0;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const [showEdit, setShowEdit] = useState(false);

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
  return (
    <TableRow>
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
        <button
          disabled={trueStatus}
          onClick={() => setShowEdit((show) => !show)}
        >
          <HiPencil />
        </button>
        <button disabled={trueStatus} onClick={() => deleteCabin(id)}>
          <HiTrash />
        </button>
      </div>
      <FullWidth>
        {showEdit && <CreateCabinForm cabinToEdit={cabin} />}
      </FullWidth>
    </TableRow>
  );
}

export default CabinRow;
