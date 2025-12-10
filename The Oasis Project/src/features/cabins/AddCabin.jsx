import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button open>Create New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

/* function AddCabin() {
  const [onShowCreate, setOnShowCreate] = useState(false);
  return (
    <>
      <Button onClick={() => setOnShowCreate(!onShowCreate)}>
        Create New Cabin
      </Button>
      {onShowCreate && (
        <Modal onClose={() => setOnShowCreate(!onShowCreate)}>
          <CreateCabinForm
            onCloseModal={() => setOnShowCreate(!onShowCreate)}
          />
        </Modal>
      )}
    </>
  );
} */

export default AddCabin;
