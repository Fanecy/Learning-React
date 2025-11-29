import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData() || [];

  return (
    <ul>
      {menu.map((cuision) => (
        <MenuItem pizza={cuision} key={cuision.id} />
      ))}
    </ul>
  );
}

export async function Loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
