import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const userName = useSelector((state) => state.User.userName);

  return (
    <div className="mt-10 text-center">
      <h1 className="mb-4 text-xl font-semibold text-stone-500 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-4xl tracking-wider text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {userName !== "" ? (
        <Button type={"primary"} to={"/menu"}>
          Continue Ordering,{userName}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
