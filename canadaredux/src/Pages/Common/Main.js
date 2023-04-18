import React, { useState, useEffect } from "react";
import Header from "./Header";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
// const Header = React.lazy(() => import("./Header"));

function Main(props) {
  useEffect(() => {
    document.body.classList.add("theme-black");
    document.body.removeAttribute("style");
  }, []);
  return (
    <>
      <section className="content home">
        <div className="container-fluid">
          <Header breadcrumb = {props.breadcrumb}/>
          <TopBar />
          <Sidebar onLogout={props.onLogout} />
          {props.children}
          <Footer />
        </div>
      </section>
    </>
  );
}

export default Main;
