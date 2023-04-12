import React from "react";
import "../Allassets/assets/plugins/morrisjs/morris.min.css";
import "../Allassets/assets/plugins/morrisjs/morris.css";
import "../Allassets/assets/plugins/jvectormap/jquery-jvectormap-2.0.3.min.css";
import "../Allassets/assets/plugins/fullcalendar/fullcalendar.min.css";
import "../Allassets/assets/css/style.css";
import "../Allassets/assets/plugins/jquery-datatable/dataTables.bootstrap4.min.css";
import "../Allassets/assets/css/main.css";
import "../Allassets/assets/css/color_skins.css";
import "../Allassets/assets/css/chatapp.css";

const Header = () => {
  return (
    <>
      <div className="block-header">
        <div className="row clearfix">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <h2>Dashboard - (ETA Canada)</h2>
            <ul className="breadcrumb padding-0">
              <li className="breadcrumb-item">
                <a href="home">
                  <i className="zmdi zmdi-home"></i>
                </a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-12">
            <div className="input-group m-b-0">
              <input
                type="text"
                className="form-control"
                id="myInputTextField"
                placeholder="Search..."
              />
              <span className="input-group-addon">
                <i className="zmdi zmdi-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
