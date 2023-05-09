import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AnonymousLayout from "./Layout/AnonymousLayout";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";
import TeamLayout from "./Layout/TeamLayout/TeamLayout";
import StaffLayout from "./Layout/StaffLayout/StaffLayout";
import ToastifyComponent from "./Components/ToastifyComponent/ToastifyComponent";
import NoMatch from "./Pages/Common/NoMatch";
import FrontLayout from "./FrontLayout/FrontLayout";
function App() {
  return (
    <>
      <ToastifyComponent />
      <Routes>
        <Route path="/track/*" element={<FrontLayout />} />
        <Route path="/" element={<AnonymousLayout />} />
        <Route path="/admin/*" element={<AdminLayout />}></Route>
        <Route path="/team/*" element={<TeamLayout />}></Route>
        <Route path="/night_staff/*" element={<StaffLayout />}></Route>
        <Route path="*" element={<NoMatch heading="Page Not Found" />}></Route>
      </Routes>
    </>
  );
}

export default App;
