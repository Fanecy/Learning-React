import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [onShowCreate, setOnShowCreate] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter/sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setOnShowCreate(!onShowCreate)}>
          Create New Cabin
        </Button>
        {onShowCreate && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
