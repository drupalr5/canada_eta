import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AnonymousLayout from "./Layout/AnonymousLayout";
import AdminLayout from "./Layout/AdminLayout";
import TeamLayout from "./Layout/TeamLayout";
import StaffLayout from "./Layout/StaffLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<AnonymousLayout />} />
        <Route path="admin/*" element={<AdminLayout />}></Route>
        <Route path="team/*" element={<TeamLayout />}></Route>
        <Route path="staff/*" element={<StaffLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;
