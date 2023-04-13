import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AnonymousLayout from "./Layout/AnonymousLayout";
import AdminLayout from "./Layout/AdminLayout";
import {ProtectedLayout,ProtectedLayout1} from "./Layout/ProtectedLayout";
import TeamLayout from "./Layout/TeamLayout";
import StaffLayout from "./Layout/StaffLayout";
import NoMatch from "./Layout/NoMatch";
import { useNavigate } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<AnonymousLayout />}></Route>
      <Route path="admin/*" element={<ProtectedLayout><AdminLayout /></ProtectedLayout>}></Route>
      <Route path="team/*" element={<ProtectedLayout><TeamLayout /></ProtectedLayout>}></Route>
      <Route path="staff/*" element={<StaffLayout />}></Route>
      <Route path="*" element={<NoMatch />}></Route>     
    </Routes>
    </div>
  );
}

export default App;
