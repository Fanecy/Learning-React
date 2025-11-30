import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <div className="text-stone-700 bg-yellow-500 uppercase px-4 py-3 border-b border-stone-400">
      <Link to="/" className="tracking-wide">
        Fast Pizza .c
      </Link>

      <UserName />

      <SearchOrder />
    </div>
  );
}

export default Header;
