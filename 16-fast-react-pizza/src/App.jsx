import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home.jsx";
import Menu, { Loader as menuLoader } from "./features/menu/Menu.jsx";
import Cart from "./features/cart/Cart.jsx";
import Order from "./features/order/Order.jsx";
import CreateUser from "./features/user/CreateUser.jsx";
import CreateOrder from "./features/order/CreateOrder.jsx";
import WebLayout from "./ui/WebLayout.jsx";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      { path: "/order/:orderId", element: <Order /> },
      { path: "/order/create", element: <CreateOrder /> },
      { path: "/user", element: <CreateUser /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
