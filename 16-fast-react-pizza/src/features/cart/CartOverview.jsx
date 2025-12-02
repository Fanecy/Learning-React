import { Link } from "react-router-dom";
import { getCartNum, getTotalCartPrice } from "./cartSlice";
import { useSelector } from "react-redux";

function CartOverview() {
  const totalPrice = useSelector(getTotalCartPrice);

  const cartNum = useSelector(getCartNum);

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-100">
      <p className="font-semibold text-stone-300">
        <span>{cartNum} pizzas</span>
        <span className="px-4">${totalPrice}</span>
      </p>
      <Link to="/cart"> Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
