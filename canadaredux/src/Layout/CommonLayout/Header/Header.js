import React from "react";
import { StyledHeader } from "./style";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
// import "../../Allassets/assets/plugins/morrisjs/morris.min.css";
// import "../../Allassets/assets/plugins/morrisjs/morris.css";
// import "../../Allassets/assets/plugins/jvectormap/jquery-jvectormap-2.0.3.min.css";
// import "../../Allassets/assets/plugins/fullcalendar/fullcalendar.min.css";
// import "../../Allassets/assets/css/style.css";
// import "../../Allassets/assets/plugins/jquery-datatable/dataTables.bootstrap4.min.css";
// import "../../Allassets/assets/css/main.css";
// import "../../Allassets/assets/css/color_skins.css";
// import "../../Allassets/assets/css/chatapp.css";

const Header = (props) => {
  return (
    <StyledHeader>
      <div className="row clearfix">
        <div className="col-lg-5 col-md-5 col-sm-12">
          <h2>{props.breadcrumb} - (ETA Canada)</h2>
          <ul className="breadcrumb padding-0">
            <li className="breadcrumb-item" style={{marginTop: '-2px'}}>
              <a href="home">
                <AiFillHome />
              </a>
            </li>
            <li className="breadcrumb-item active">{props.breadcrumb}</li>
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
              <AiOutlineSearch />
            </span>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}

export default Header;
