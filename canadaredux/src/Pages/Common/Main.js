import React, { useState, useEffect } from "react";
import Header from "../../Layout/CommonLayout/Header";
import TopBar from "../../Layout/CommonLayout/TopBar";
import Sidebar from "../../Layout/CommonLayout/Sidebar";
import Footer from "../../Layout/CommonLayout/Footer";
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
