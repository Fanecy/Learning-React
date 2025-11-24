/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) nav("/");
    },
    [isAuthenticated, nav]
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoutes;
