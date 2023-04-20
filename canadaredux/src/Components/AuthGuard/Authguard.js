import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthParameter from "../../Hooks/useAuthParameter";
import { useDispatch } from "react-redux";

export const Authguard = ({ children }) => {
  const { type, token } = useAuthParameter();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname === "/") {
      if (token) {
        if (type === "Admin") {
          return navigate("/admin"); //navigate("admin/dashboard");
        } else if (type === "Team") {
          return navigate("/team");
        } else if (type === "Night Staff") {
          return navigate("/night_staff");
        }
      }
    } else if (
      !token &&
      (pathname.includes("/admin") ||
        pathname.includes("/team") ||
        pathname.includes("/night_staff"))
    ) {
      return navigate("/");
    } else if (
      token &&
      type === "Admin" &&
      (pathname.includes("/team") || pathname.includes("/night_staff"))
    ) {
      return navigate("/admin");
    } else if (
      token &&
      type === "Team" &&
      (pathname.includes("/admin") || pathname.includes("/night_staff"))
    ) {
      return navigate("/team");
    } else if (
      token &&
      type === "Night Staff" &&
      (pathname.includes("/team") || pathname.includes("/admin"))
    ) {
      return navigate("/night_staff");
    }
  }, [token, navigate, dispatch, pathname, type]);
  return children;
};
