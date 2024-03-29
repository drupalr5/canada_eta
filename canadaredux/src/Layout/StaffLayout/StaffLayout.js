import Header from "../CommonLayout/Header/Header";
import Breadcrumb from "../CommonLayout/Breadcrumb";
import AdminNavBar from "../CommonLayout/NavBar/NavBar";
import Sidebar from "../CommonLayout/Sidebar/Sidebar";
import Footer from "../CommonLayout/Footer";
import Main from "./Main";
import { useEffect } from "react";
import { SectionStyled, ContainerFluid } from "../AdminLayout/style";

function StaffLayout(props) {
  useEffect(() => {
    document.body.classList.add("theme-black");
    document.body.removeAttribute("style");
  }, []);
  return (
    <SectionStyled>
      <ContainerFluid>
        <Header breadcrumb={<Breadcrumb />} />
        <AdminNavBar />
        <Sidebar onLogout="" />
        <Main />
        <Footer />
      </ContainerFluid>
    </SectionStyled>
  );
}

export default StaffLayout;
