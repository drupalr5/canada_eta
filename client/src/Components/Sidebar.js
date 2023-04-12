import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const logoutHnadler = () => {
    localStorage.removeItem("isLoggedIn");
    navigate('/')
  };
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
                        src="https://canada-eta.online/admin/icons/logout.png"
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
                <a
                  href="awaiting_order"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/awaiting_response.svg" alt=""/>
                  <span>Awaiting Customer</span>{" "}
                  <span className="badge badge-default float-right">21</span>
                </a>
              </li>
              <li className="">
                <a
                  href="awaiting_govt_order"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/awaiting_response.svg" alt=""/>
                  <span>Awaiting Govt</span>{" "}
                  <span className="badge badge-default float-right">137</span>
                </a>
              </li>
              <li className="">
                <a
                  href="order_history"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/order_history.svg" alt=""/>
                  <span>Order History</span>{" "}
                  <span className="badge badge-default float-right">10742</span>
                </a>
              </li>
              <li className="">
                <a
                  href="delete_order"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/deleted_order.svg" alt=""/>
                  <span>Deleted Orders</span>{" "}
                  <span className="badge badge-default float-right">5</span>
                </a>
              </li>
              <li className="">
                <a
                  href="refund_order"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/refund_order.svg" alt=""/>
                  <span>Refund Orders</span>{" "}
                  <span className="badge badge-default float-right">62</span>
                </a>
              </li>
              <li className="active open">
                <a
                  href="rejected_order"
                  className="menu-toggle toggled waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/refund_order.svg" alt=""/>
                  <span>Rejected ETA</span>{" "}
                  <span className="badge badge-default float-right">135</span>
                </a>
              </li>
              <li className="header">Reporting</li>
              <li>
                <a
                  href="javascript:void(0);"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/zoho.svg" alt=""/>
                  <span>Zoho</span>
                  <span className="badge badge-default float-right">0</span>
                </a>
              </li>
              <li className="header">Settings</li>
              <li className="sm_menu_btm ">
                {" "}
                <a
                  href="change_password"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/password.svg" alt=""/>
                  <span>Change Password</span>
                </a>
              </li>
              <li className="sm_menu_btm ">
                {" "}
                <a
                  href="settings"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/gateway_setting.svg" alt=""/>
                  <span>Gateway</span>
                </a>
              </li>
              <li className="sm_menu_btm ">
                {" "}
                <a
                  href="manage_team"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/manage_team.svg" alt=""/>
                  <span>Manage Team</span>
                </a>
              </li>
              <li className="sm_menu_btm ">
                {" "}
                <a
                  href="manage_country"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src="https://canada-eta.online/admin/assets/images/gateway_setting.svg" alt=""/>
                  <span>Manage Country</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
