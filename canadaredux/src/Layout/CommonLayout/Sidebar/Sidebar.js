import React, { useEffect } from "react";
import Logo from "../Logo";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "../../../Allassets/icons/logout.png";
import Awaiting from "../../../Allassets/assets/images/awaiting_response.svg";
import OrderHistory from "../../../Allassets/assets/images/order_history.svg";
import DeletedOrder from "../../../Allassets/assets/images/deleted_order.svg";
import RefundOrder from "../../../Allassets/assets/images/refund_order.svg";
import Zoho from "../../../Allassets/assets/images/zoho.svg";
import ReportIssue from "../../../Allassets/assets/images/report_issue.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/authSlice";
import { getOrderSideBarCount } from "../../../Redux/orderSlice";
import useAuthParameter from "../../../Hooks/useAuthParameter";
import AdminSidebar from "./AdminSidebar";
import { MiniAsideLeftBar, MiniAsideRightMenu, OverlayWrapper } from './style'
import { FaBars } from 'react-icons/fa'
import { toggleSidebar } from '../../../Redux/orderSlice';
function Sidebar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSideBar = useSelector((state) => state?.order?.showSideBar);
  const { param, path, type, name } = useAuthParameter();
  const logoutHnadler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };
  const tiles = useSelector(state => state?.order?.sideBarCount)
  useEffect(() => {
    dispatch(getOrderSideBarCount(param))
      .unwrap()
      .then((res) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <>
      <OverlayWrapper overlay={showSideBar ? true : false}></OverlayWrapper>
      <MiniAsideLeftBar>
        <ul className="menu_list">
          <li>
            <Link to="#" className="bars" onClick={() => {
              dispatch(toggleSidebar());
            }}>
              <FaBars className="bars-icon" />
            </Link>
          </li>
        </ul>
      </MiniAsideLeftBar>
      <MiniAsideRightMenu>
        <div id="leftsidebar" className={`sidebar ${showSideBar ? "show" : "hide"}`}>
          <div className="menu">
            <ul className="list">
              <li>
                <div className="user-info m-b-20">
                  <div className="image">
                    <Link to={`${path}`}>
                      <Logo style={{ margin: "auto" }} />
                    </Link>
                  </div>
                  <div className="detail">
                    <h6>{name}</h6>
                    <Link
                      className="nav-link waves-effect waves-block"
                      to="/"
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
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <NavLink
                  to={`${path}/awaiting-order`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={Awaiting} alt="" />
                  <span>Awaiting Customer</span>{" "}
                  <span className="badge badge-default float-right">
                    {tiles.awiatingCount}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${path}/awaiting-govt-order`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={Awaiting} alt="" />
                  <span>Awaiting Govt</span>{" "}
                  <span className="badge badge-default float-right">
                    {tiles.awaitingGovtCount}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${path}/order-history`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={OrderHistory} alt="" />
                  <span>Order History</span>{" "}
                  <span className="badge badge-default float-right">
                    {tiles.historyCount}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${path}/delete-order`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={DeletedOrder} alt="" />
                  <span>Deleted Orders</span>{" "}
                  <span className="badge badge-default float-right">
                    {tiles.deletedCount}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${path}/refund-order`}
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={RefundOrder} alt="" />
                  <span>Refund Orders</span>{" "}
                  <span className="badge badge-default float-right">
                    {tiles.refundCount}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${path}/rejected-order`}
                  className="menu-toggle toggled waves-effect waves-block"
                >
                  <img src={RefundOrder} alt="" />
                  <span>Rejected ETA</span>{" "}
                  <span className="badge badge-default float-right">
                    {tiles.rejectedCount}
                  </span>
                </NavLink>
              </li>
              <li className="header">--Reporting</li>
              {(type === 'Team' || type === 'Night Staff') ?
                <NavLink
                  to={`${path}/website-issue`}
                  className="menu-toggle toggled waves-effect waves-block"
                >
                  <img src={ReportIssue} alt="" />
                  <span>Website Issues</span>{" "}
                </NavLink> : ""
              }
              <li>
                <NavLink
                  to="zoho"
                  className="menu-toggle waves-effect waves-block"
                >
                  <img src={Zoho} alt="" />
                  <span>Zoho</span>
                  <span className="badge badge-default float-right">0</span>
                </NavLink>
              </li>
              {(type === 'Admin') ? <AdminSidebar /> : ''}
            </ul>
          </div>
        </div>
      </MiniAsideRightMenu >
    </>
  );
}

export default Sidebar;
