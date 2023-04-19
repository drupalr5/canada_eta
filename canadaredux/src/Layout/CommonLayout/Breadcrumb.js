import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Breadcrumb() {
  const [breadcrumb, setBreadcrumb] = useState("");
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    const path = location.pathname.split("/");
    if (path.length > 0) {
      let text = "";
      switch (path[2]) {
        case "priority-order":
          text = "Priority Order";
          break;
        case "pending-order":
          text = "Pending Orders";
          break;
        case "completed-order":
          text = "Completed Orders";
          break;
        case "contact-customer":
          text = "Contact Customer";
          break;
        case "awaiting-order":
          text = "Awaiting Customer";
          break;
        case "awaiting-govt-order":
          text = "Awaiting Govt";
          break;
        case "order-history":
          text = "Order History";
          break;
        case "delete-order":
          text = "Delete Orders";
          break;
        case "refund-order":
          text = "Refund Orders";
          break;
        case "rejected-order":
          text = "Rejected Orders";
          break;
        case "change-password":
          text = "Change Password";
          break;
        case "settings":
          text = "Gateway Setting";
          break;
        case "manage-team":
          text = "Manage Team";
          break;
        case "manage-country":
          text = "Manage Country";
          break;
        case "order-details":
          text = "Order Details";
          break;
        case "website-issue":
          text = "User Accounts";
          break;
        default:
          text = "Dashboard";
          break;
      }
      setBreadcrumb(text);
      text = text=='Dashboard' ? '' : (text +' |')
      document.title = `${text} ETA Canada`;
    }
  }, [pathname]);
  return <>{breadcrumb}</>;
}

export default Breadcrumb;
