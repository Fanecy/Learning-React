import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-6">
      <LinkButton src="/menu">&larr; Back to menu</LinkButton>

      <p className="px-20 py-10 text-xl font-semibold text-stone-700">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
