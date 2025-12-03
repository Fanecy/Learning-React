import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="small">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }) {
  const data = { priority: true };
  updateOrder(params.orderId, data);

  return null;
}
