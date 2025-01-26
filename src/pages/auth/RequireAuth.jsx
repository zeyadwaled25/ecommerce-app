import { useContext } from "react";
import { User } from "./Context";
import { Navigate, useLocation, Outlet } from "react-router";

export default function RequireAuth() {
  const user = useContext(User);
  const location = useLocation();

  return user.auth.userDetails ? <Outlet /> : <Navigate state={{ from: location }} replace to="/login" />;
}