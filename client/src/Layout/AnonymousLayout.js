import Login from "../Components/Login";
import { Routes, Route } from "react-router-dom";

const AnonymousLayout = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}></Route>      
    </Routes>
    </>
  );
}

export default AnonymousLayout;
