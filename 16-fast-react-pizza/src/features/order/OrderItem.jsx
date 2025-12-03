/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex flex-row items-center justify-between gap-5 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
          <span className="px-4 text-sm font-thin capitalize italic">
            {isLoadingIngredients ? "Loading..." : ingredients.join(",")}
          </span>
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
