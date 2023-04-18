import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AnonymousLayout from "./Layout/AnonymousLayout";
import AdminLayout from "./Layout/AdminLayout";
import TeamLayout from "./Layout/TeamLayout";
import StaffLayout from "./Layout/StaffLayout";
import NoMatch from "./Layout/NoMatch";
import { useNavigate } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<AnonymousLayout />}></Route>
      <Route path="admin/*" element={<AdminLayout />}></Route>
      <Route path="team/*" element={<TeamLayout />}></Route>
      <Route path="staff/*" element={<StaffLayout />}></Route>
      <Route path="*" element={<NoMatch />}></Route>     
    </Routes>
    </div>
  );
}

export default App;
