import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";

/* const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]; */

function Cart() {
  const cart = useSelector((state) => state.Cart.cart);

  const userName = useSelector((state) => state.User.userName);

  return (
    <div className="px-4 py-3">
      <LinkButton src={"/menu"}>&larr; Back to menu</LinkButton>

      <h2 className="mb-3 mt-7 text-xl font-semibold">Your cart, {userName}</h2>

      <ul className="divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-4 space-x-2">
        <Button to={"/order/new"} type="small">
          Order pizzas
        </Button>
        <Button type={"secondary"}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
