import { useState } from "react";

// https://uibakery.io/regex-library/phone-number

import Button from "../../ui/Button";

import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";

import { formatCurrency } from "../../utils/helpers";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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
];
 */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errors = useActionData();

  const dispatch = useDispatch();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  const {
    userName,
    address,
    status: addressStatus,
    position,
    errors: addressError,
  } = useSelector((state) => state.User);
  const isLoading = addressStatus === "loading";

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

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-36">Address</label>
          <div className="grow">
            <input
              disabled={isLoading}
              type="text"
              name="address"
              required
              defaultValue={address}
              className="input w-full sm:w-auto"
            />
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-32">
              <Button
                disabled={isLoading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                GetLocation
              </Button>
            </span>
          )}

          {addressStatus === "error" && (
            <em className="mr-56 rounded-lg bg-red-400 p-2 text-xs text-red-700 sm:my-2">
              {addressError?.message}
            </em>
          )}
        </div>

        <div className="mb-8 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-4 w-4 accent-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />

          <input
            type="hidden"
            value={
              position.latitude
                ? `${position.latitude},${position.longitude}`
                : " "
            }
            name="position"
          />
          <Button type={"primary"} disabled={isLoading || isSubmitting}>
            {isSubmitting
              ? "Submitting Order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
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
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Wrong Number!";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
