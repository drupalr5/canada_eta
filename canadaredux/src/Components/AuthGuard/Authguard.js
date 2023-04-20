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
    console.log(pathname);
    if (pathname === "/") {
      if (token) {
        if (type === "Admin") {
          return navigate("/admin"); //navigate("admin/dashboard");
        } else if (type === "Team") {
          return navigate("/team");
        } else if (type === "Night Staff") {
          return navigate("/staff");
        }
      }
    } else if (
      !token &&
      (pathname.includes("/admin") ||
        pathname.includes("/team") ||
        pathname.includes("/staff"))
    ) {
      return navigate("/");
    } else if (
      token &&
      type === "Admin" &&
      (pathname.includes("/team") || pathname.includes("/staff"))
    ) {
      return navigate("/admin");
    } else if (
      token &&
      type === "Team" &&
      (pathname.includes("/admin") || pathname.includes("/staff"))
    ) {
      return navigate("/team");
    } else if (
      token &&
      type === "staff" &&
      (pathname.includes("/team") || pathname.includes("/admin"))
    ) {
      return navigate("/staff");
    }
  }, [token, navigate, dispatch, pathname, type]);
  return children;
};
