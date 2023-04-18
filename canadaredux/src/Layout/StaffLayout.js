import { Routes, Route } from "react-router-dom";
import Main from "../Pages/Common/Main";
import Home from "../Pages/Common/Home";
import PriorityOrder from "../Pages/Common/PriorityOrder";
import PendingOrder from "../Pages/Common/PendingOrder";
import CompletedOrder from "../Pages/Common/CompletedOrder";
import ContactCustomer from "../Pages/Common/ContactCustomer";
import AwaitingOrder from "../Pages/Common/AwaitingOrder";
import AwaitingGovtOrder from "../Pages/Common/AwaitingGovtOrder";
import OrderHistory from "../Pages/Common/OrderHistory";
import DeleteOrder from "../Pages/Common/DeleteOrder";
import RefundOrder from "../Pages/Common/RefundOrder";
import RejectedOrder from "../Pages/Common/RejectedOrder";
import WebsiteIssue from "../Pages/Staff/WebsiteIssue";
import OrderDetails from "../Pages/Common/OrderDetails";

function StaffLayout() {
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
            <Main breadcrumb="Pending Orders">
              <PendingOrder heading="Pending Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="completed-order"
          element={
            <Main breadcrumb="Completed Orders">
              <CompletedOrder heading="Completed Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="contact-customer"
          element={
            <Main breadcrumb="Contact Customer">
              <ContactCustomer heading="Completed Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="awaiting-order"
          element={
            <Main breadcrumb="Awaiting Customer">
              <AwaitingOrder heading="Pending Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="awaiting-govt-order"
          element={
            <Main breadcrumb="Awaiting Govt">
              <AwaitingGovtOrder heading="Pending Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="order-history"
          element={
            <Main breadcrumb="Order History">
              <OrderHistory heading="Order History" />
            </Main>
          }
        ></Route>
        <Route
          path="delete-order"
          element={
            <Main breadcrumb="Delete Orders">
              <DeleteOrder heading="Delete Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="refund-order"
          element={
            <Main breadcrumb="Refund Orders">
              <RefundOrder heading="Completed Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="rejected-order"
          element={
            <Main breadcrumb="Rejected Orders">
              <RejectedOrder heading="Rejected Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="website-issue"
          element={
            <Main>
              <WebsiteIssue heading="User Accounts" />
            </Main>
          }
        ></Route>
        <Route
          path="order-details"
          element={
            <Main breadcrumb="Order Details">
              <OrderDetails heading="Order Details" />
            </Main>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default StaffLayout;
