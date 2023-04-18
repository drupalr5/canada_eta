import Header from "../CommonLayout/Header";
import Breadcrumb from "../CommonLayout/Breadcrumb";
import TopBar from "../CommonLayout/TopBar";
import Sidebar from "../CommonLayout/Sidebar";
import Footer from "../CommonLayout/Footer";
import Main from "./Main";
import { useEffect } from "react";


function AdminLayout(props) {
  useEffect(() => {
    document.body.classList.add("theme-black");
    document.body.removeAttribute("style");
  }, []);
  return (
    <>
      <section className="content home">
        <div className="container-fluid">
          <Header breadcrumb={<Breadcrumb />} />
          <TopBar />
          <Sidebar onLogout="" />
          <Main />
          <Footer />
        </div>
      </section>
    </>
  );
}

export default AdminLayout;
