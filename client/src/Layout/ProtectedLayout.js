import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";

function ProtectedLayout({children}) {
  if(!localStorage.getItem("isLoggedIn")) {
    return <Navigate to='/'/>
  }
  return children
  
}

export default ProtectedLayout