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
    if (pathname === "/" || (pathname.includes('/admin') || pathname.includes('/team') || pathname.includes('/staff'))) {
      if(token) {
        if (type === "Admin") {
          return navigate("/admin"); //navigate("admin/dashboard");
        } else if (type === "Team") {
          return navigate("/team");
        } else if (type === "Night Staff") {
          return navigate("/staff");
        }
      }else {
        return navigate("/");
      }
    } else if(!token && (pathname.includes('/admin') || pathname.includes('/team') || pathname.includes('/staff'))){
      return navigate("/");
    }
  }, [token, navigate, dispatch, pathname, type]);
  return children;
};
