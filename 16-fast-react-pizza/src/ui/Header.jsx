import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-stone-400 bg-yellow-500 px-4 py-3 uppercase text-stone-700">
      <Link to="/" className="tracking-wide">
        Fast Pizza .c
      </Link>

      <SearchOrder />

      <UserName />
    </div>
  );
}

export default Header;
