import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  //1.加载认证用户

  const navigate = useNavigate();
  const { isLoading, isAuth } = useUser();

  //2.如果未找到用户，转到登录页面
  useEffect(
    function () {
      if (!isAuth && !isLoading) navigate("/login");
    },
    [isLoading, isAuth, navigate]
  );

  //3.加载转盘
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4.如果找到，加载app
  if (isAuth) return children;
}

export default ProtectedRoute;
