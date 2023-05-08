import React from "react";
import Password from "../../../Allassets/assets/images/password.svg";
import GatewaySetting from "../../../Allassets/assets/images/gateway_setting.svg";
import ManageTeam from "../../../Allassets/assets/images/manage_team.svg";
import { NavLink } from "react-router-dom";
import useAuthParameter from "../../../Hooks/useAuthParameter";

function AdminSidebar() {
  const { user, type, name, path, param } = useAuthParameter();
  return (
    <>
    <li className="header">--Settings</li>
    <li className="sm_menu_btm ">
      <NavLink
        to={`${path}/change-password`}
        className="menu-toggle waves-effect waves-block"
      >
        <img src={Password} alt="" />
        <span>Change Password</span>
      </NavLink>
    </li>
    <li className="sm_menu_btm ">
      <NavLink
        to={`${path}/settings`}
        className="menu-toggle waves-effect waves-block"
      >
        <img src={GatewaySetting} alt="" />
        <span>Gateway</span>
      </NavLink>
    </li>
    <li className="sm_menu_btm ">
      <NavLink
        to={`${path}/manage-team`}
        className="menu-toggle waves-effect waves-block"
      >
        <img src={ManageTeam} alt="" />
        <span>Manage Team</span>
      </NavLink>
    </li>
    <li className="sm_menu_btm ">
      <NavLink
        to={`${path}/manage-country`}
        className="menu-toggle waves-effect waves-block"
      >
        <img src={GatewaySetting} alt="" />
        <span>Manage Country</span>
      </NavLink>
    </li>
    </>
  );
}

export default AdminSidebar;
