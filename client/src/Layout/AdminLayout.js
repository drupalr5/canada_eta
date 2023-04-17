import { Routes, Route } from "react-router-dom";
import Main from "../Components/Main";
import Home from "../Components/Home";
import PriorityOrder from "../Components/PriorityOrder";
import PendingOrder from "../Components/PendingOrder";
import CompletedOrder from "../Components/CompletedOrder";
import ContactCustomer from "../Components/ContactCustomer";
import AwaitingOrder from "../Components/AwaitingOrder";
import AwaitingGovtOrder from "../Components/AwaitingGovtOrder";
import OrderHistory from "../Components/OrderHistory";
import DeleteOrder from "../Components/DeleteOrder";
import RefundOrder from "../Components/RefundOrder";
import RejectedOrder from "../Components/RejectedOrder";
import ChangePassword from "../Components/ChangePassword";
import Settings from "../Components/Settings";
import ManageTeam from "../Components/ManageTeam";
import ManageCountry from "../Components/ManageCountry";
import OrderDetails from "../Components/OrderDetails";

function AdminLayout() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main breadcrumb="Dashboard">
              <Home heading="Recent Orders" />
            </Main>
          }
        ></Route>        
        <Route
          path="priority-order"
          element={
            <Main breadcrumb="Priority Order">
              <PriorityOrder heading="Recent Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="pending-order"
          element={
            <Main breadcrumb="Pending Orders" >
              <PendingOrder heading="Pending Orders" />
            </Main>
          }
        ></Route>        
        <Route
          path="completed-order"
          element={
            <Main breadcrumb="Completed Orders" >
              <CompletedOrder heading="Completed Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="contact-customer"
          element={
            <Main breadcrumb="Contact Customer" >
              <ContactCustomer heading="Completed Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="awaiting-order"
          element={
            <Main breadcrumb="Awaiting Customer" >
              <AwaitingOrder heading="Pending Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="awaiting-govt-order"
          element={
            <Main breadcrumb="Awaiting Govt" >
              <AwaitingGovtOrder heading="Pending Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="order-history"
          element={
            <Main breadcrumb="Order History" >
              <OrderHistory heading="Order History" />
            </Main>
          }
        ></Route>
        <Route
          path="delete-order"
          element={
            <Main breadcrumb="Delete Orders" >
              <DeleteOrder heading="Delete Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="refund-order"
          element={
            <Main breadcrumb="Refund Orders" >
              <RefundOrder heading="Completed Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="rejected-order"
          element={
            <Main breadcrumb="Rejected Orders" >
              <RejectedOrder heading="Rejected Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="change-password"
          element={
            <Main breadcrumb="Change Password" >
              <ChangePassword heading="Update Password" />
            </Main>
          }
        ></Route>
        <Route
          path="settings"
          element={
            <Main breadcrumb="Gateway Setting" >
              <Settings heading="Gateway Setting" />
            </Main>
          }
        ></Route>
        <Route
          path="manage-team"
          element={
            <Main breadcrumb="Manage Team" >
              <ManageTeam heading="Manage Team" />
            </Main>
          }
        ></Route>
        <Route
          path="manage-country"
          element={
            <Main breadcrumb="Manage Country" >
              <ManageCountry heading="Country Listing" />
            </Main>
          }
        ></Route>        
        <Route
          path="order-details"
          element={
            <Main breadcrumb="Order Details" >
              <OrderDetails heading="Order Details" />
            </Main>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default AdminLayout;
