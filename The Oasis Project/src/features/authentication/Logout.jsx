import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logoutMutate, logoutStatus } = useLogout();
  return (
    <ButtonIcon disabled={logoutStatus === "loading"} onClick={logoutMutate}>
      {logoutStatus === "loading" ? (
        <SpinnerMini />
      ) : (
        <HiArrowRightOnRectangle />
      )}
    </ButtonIcon>
  );
}

export default Logout;
