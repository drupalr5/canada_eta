import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedLayout = ({children}) => {
  if(!localStorage.getItem("isLoggedIn")){
    return <Navigate to='/'/>
   } else {
<Outlet />
   } 
  
  return children
  
}

// export const ProtectedLayout1 = ({children}) => {
  
//   if(!localStorage.getItem("isLoggedIn")){
//     return <Navigate to='admin/dashboard'/>
//    }
  
//   return children
  
// }

// import React, { useState, useEffect } from "react";
// import { Navigate,useNavigate } from "react-router-dom";

// export const ProtectedLayout = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"))
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!localStorage.getItem("isLoggedIn")) {
//       return navigate("/");
//     } else {
//       console.log(user.type)
//       if (user.type === 'Admin') {
//         return <Navigate to='admin/dashboard'/>//navigate("admin/dashboard");
//       } else if (user.type === 'Team') {
//         return navigate("team/dashboard");
//       } else if (user.type === 'Night Staff') {
//         return navigate("staff/dashboard");
//       }
//     }
//   }, []);
//   return children;
// };