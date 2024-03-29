import { Routes, Route } from "react-router-dom";
import Main from "../Components/Main";
import Home from "../Components/Home";
import AwaitingOrder from "../Components/AwaitingOrder";
import AwaitingGovtOrder from "../Components/AwaitingGovtOrder";
import OrderHistory from "../Components/OrderHistory";
import DeleteOrder from "../Components/DeleteOrder";
import RefundOrder from "../Components/RefundOrder";
import RejectedOrder from "../Components/RejectedOrder";
import CompletedOrder from "../Components/CompletedOrder";
import OrderDetails from "../Components/OrderDetails";
import ContactCustomer from "../Components/ContactCustomer";

function CommonLayout() {
  return (
    <>
      <Routes>
        <Route
          path="dashboard"
          element={
            <Main>
              <Home heading="Recent Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="awaiting-order"
          element={
            <Main>
              <AwaitingOrder heading="Pending Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="awaiting-govt-order"
          element={
            <Main>
              <AwaitingGovtOrder heading="Pending Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="order-history"
          element={
            <Main>
              <OrderHistory heading="Order History" />
            </Main>
          }
        ></Route>
        <Route
          path="delete-order"
          element={
            <Main>
              <DeleteOrder heading="Delete Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="refund-order"
          element={
            <Main>
              <RefundOrder heading="Completed Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="rejected-order"
          element={
            <Main>
              <RejectedOrder heading="Rejected Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="completed-order"
          element={
            <Main>
              <CompletedOrder heading="Completed Orders" />
            </Main>
          }
        ></Route>
        <Route
          path="order-details"
          element={
            <Main>
              <OrderDetails heading="Order Details" />
            </Main>
          }
        ></Route>
        <Route
          path="contact-customer"
          element={
            <Main>
              <ContactCustomer heading="Contact Customer" />
            </Main>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default CommonLayout;
