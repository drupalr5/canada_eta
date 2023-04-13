import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      return navigate("/");
    } else {
      console.log(user.type)
      if (user.type === 'Admin') {
        // return navigate("admin/dashboard");
      } else if (user.type === 'Team') {
        return navigate("team/dashboard");
      } else if (user.type === 'Night Staff') {
        return navigate("staff/dashboard");
      }
    }
  }, []);
  return children;
};
