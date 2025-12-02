/* import { useState } from "react";
 */
// https://uibakery.io/regex-library/phone-number

import Button from "../../ui/Button";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
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
];

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useSelector } from "react-redux";

function CreateOrder() {
  /*   const [withPriority, setWithPriority] = useState(false); */
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errors = useActionData();

  const userName = useSelector((state) => state.User.userName);

  return (
    <div className="px-4 py-6">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-36">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            required
            className="input"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-36">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              className="input w-full sm:w-auto"
            />
          </div>
          {errors?.phone && (
            <em className="mr-56 rounded-lg bg-red-400 p-2 text-xs text-red-700 sm:my-2">
              {errors.phone}
            </em>
          )}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-36">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-4 w-4 accent-yellow-400"
            /*             value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)} */
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <Button type={"primary"}>
            {isSubmitting ? "Submitting Order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Wrong Number!";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
