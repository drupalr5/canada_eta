import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AnonymousLayout from "./Layout/AnonymousLayout";
import UserLayout from "./Layout/UserLayout";
import ProtectedLayout from "./Layout/ProtectedLayout";
import NoMatch from "./Layout/NoMatch";
import { useNavigate } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<AnonymousLayout />}></Route>
      <Route path="home/*" element={<ProtectedLayout><UserLayout /></ProtectedLayout>}></Route>
      <Route path="*" element={<NoMatch />}></Route>     
    </Routes>
    </div>
  );
}

export default App;
