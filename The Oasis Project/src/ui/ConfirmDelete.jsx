import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">删除 {resourceName}</Heading>
      <p>你确定你想永久删除 {resourceName} ? 它将永远无法找回！</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal()}
        >
          取消
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          删除
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
