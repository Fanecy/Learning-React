import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();

  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get("discount") || "name-asc";

  if (isLoading) return <Spinner />;

  let filteredCabin;
  if (searchValue === "all") filteredCabin = cabins;
  else if (searchValue === "no-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount === 0);
  else filteredCabin = cabins.filter((cabin) => cabin.discount !== 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [sortField, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabin = filteredCabin.sort(
    (a, b) => (a[sortField] - b[sortField]) * modifier
  );

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
