import { useSelector } from "react-redux";

function UserName() {
  const userName = useSelector((state) => state.User.userName);

  if (!userName) return null;
  return (
    <div className="hidden text-sm font-semibold md:block">{userName}</div>
  );
}

export default UserName;
