// import { Navigate } from "react-router-dom";
// import AnonymousLayout from "./AnonymousLayout";

// export const Authguard = ({children}) => {
//   const user = JSON.parse(localStorage.getItem("user"))

//   if(!localStorage.getItem("isLoggedIn")){
//     return <AnonymousLayout/>;
//   }
//   return children;
// }

// export const ProtectedLayout1 = ({children}) => {

//   if(!localStorage.getItem("isLoggedIn")){
//     return <Navigate to='admin/dashboard'/>
//    }

//   return children

// }

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Authguard = ({ children }) => {
  // console.log(JSON.parse(JSON.parse(localStorage.getItem("user")).data))
  const user = JSON.parse(localStorage.getItem("user"))? JSON.parse(JSON.parse(localStorage.getItem("user")).data) : null;
  
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const navigate = useNavigate();
  const { pathname } = useLocation();


  useEffect(() => {
    if (pathname === "/") {
      if(token) {
        if (user.type === "Admin") {
          return navigate("/admin"); //navigate("admin/dashboard");
        } else if (user.type === "Team") {
          return navigate("/team");
        } else if (user.type === "Night Staff") {
          return navigate("/staff");
        }
      }
    } else if(!token && pathname.includes('/admin')){
      return navigate("/");
    } else{
      // return navigate("/");
    }
  }, [token, navigate, pathname]);
  return children;
};
