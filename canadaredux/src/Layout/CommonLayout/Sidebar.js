import React, {useState, useEffect} from "react";
import axios from "axios";
import config from "../../config.json"
import Logo from "./Logo";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "../../Allassets/icons/logout.png";
import Awaiting from "../../Allassets/assets/images/awaiting_response.svg";
import OrderHistory from "../../Allassets/assets/images/order_history.svg";
import DeletedOrder from "../../Allassets/assets/images/deleted_order.svg";
import RefundOrder from "../../Allassets/assets/images/refund_order.svg";
import Zoho from "../../Allassets/assets/images/zoho.svg";
import Password from "../../Allassets/assets/images/password.svg";
import GatewaySetting from "../../Allassets/assets/images/gateway_setting.svg";
import ManageTeam from "../../Allassets/assets/images/manage_team.svg";
import { NavLink } from "react-router-dom";

function Sidebar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  let loginUser = JSON.parse(JSON.parse(localStorage.getItem("user")).data);
  let utype = loginUser.type ? loginUser.type : ''
  let u_type = utype ? `/${utype.toLowerCase()}` : '';
  const logoutHnadler = () => {
    localStorage.removeItem("user");
    navigate('/')
  };
  const [tiles, setTiles] = useState({});
  useEffect(() => {
    axios.get(config.API_URL + '/order/ordercounts').then((response) => {
      setTiles(response.data)
    }).catch((error) => {
      alert(error);
    });
  }, [])

  return (
    <>
      <aside id="minileftbar" className="minileftbar">
        <ul className="menu_list">
          <li>
            <a href="javascript:void(0);" className="bars"></a>
          </li>
        </ul>
      </aside>
      <aside className="right_menu">
        <div id="leftsidebar" className="sidebar">
          <div className="menu">
            <ul className="list">
              <li>
                <div className="user-info m-b-20">
                  <div className="image">
                    <Logo />
                  </div>
                  <div className="detail">
                    <h6>Admin</h6>
                    <a
                      className="nav-link waves-effect waves-block"
                      href="#"
                      onClick={logoutHnadler}
                    >
                      <img
                        src={LogoutIcon}
                        className="sidebar_icons"
                        height="10%"
                        width="18%"
                        alt=""
                      />
                      Logout
                    </a>
                  </div>
                </div>
              </li>
              <li className="">
                <NavLink
                  to={`${u_type}/awaiting-order`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={Awaiting} alt=""/>
                  <span>Awaiting Customer</span>{" "}
                  <span className="badge badge-default float-right">{tiles.awiatingCount}</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to={`${u_type}/awaiting-govt-order`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={Awaiting} alt=""/>
                  <span>Awaiting Govt</span>{" "}
                  <span className="badge badge-default float-right">{tiles.awaitingGovtCount}</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to={`${u_type}/order-history`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={OrderHistory} alt=""/>
                  <span>Order History</span>{" "}
                  <span className="badge badge-default float-right">{tiles.historyCount}</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to={`${u_type}/delete-order`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={DeletedOrder} alt=""/>
                  <span>Deleted Orders</span>{" "}
                  <span className="badge badge-default float-right">{tiles.deletedCount}</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to={`${u_type}/refund-order`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={RefundOrder} alt=""/>
                  <span>Refund Orders</span>{" "}
                  <span className="badge badge-default float-right">{tiles.refundCount}</span>
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to={`${u_type}/rejected-order`}
                  className="menu-toggle toggled waves-effect waves-block"
                >
                  <img src={RefundOrder} alt=""/>
                  <span>Rejected ETA</span>{" "}
                  <span className="badge badge-default float-right">{tiles.rejectedCount}</span>
                </NavLink>
              </li>
              <li className="header">Reporting</li>
              <li>
                <NavLink
                  to="javascript:void(0);"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={Zoho} alt=""/>
                  <span>Zoho</span>
                  <span className="badge badge-default float-right">0</span>
                </NavLink>
              </li>
              <li className="header">Settings</li>
              <li className="sm_menu_btm ">
                {" "}
                <NavLink
                  to={`${u_type}/change-password`} 
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={Password} alt=""/>
                  <span>Change Password</span>
                </NavLink>
              </li>
              <li className="sm_menu_btm ">
                {" "}
                <NavLink
                  to={`${u_type}/settings`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={GatewaySetting} alt=""/>
                  <span>Gateway</span>
                </NavLink>
              </li>
              <li className="sm_menu_btm ">
                {" "}
                <NavLink
                  to={`${u_type}/manage-team`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={ManageTeam} alt=""/>
                  <span>Manage Team</span>
                </NavLink>
              </li>
              <li className="sm_menu_btm ">
                {" "}
                <NavLink
                  to={`${u_type}/manage-country`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={GatewaySetting} alt=""/>
                  <span>Manage Country</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
