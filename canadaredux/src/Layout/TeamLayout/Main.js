import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/Common/Home/Home";
import PriorityOrder from "../../Pages/Common/PriorityOrder/PriorityOrder";
import PendingOrder from "../../Pages/Common/PendingOrder/PendingOrder";
import CompletedOrder from "../../Pages/Common/CompletedOrder/CompletedOrder";
import ContactCustomer from "../../Pages/Common/ContactCustomer/ContactCustomer";
import AwaitingOrder from "../../Pages/Common/AwaitingOrder/AwaitingOrder";
import AwaitingGovtOrder from "../../Pages/Common/AwaitingGovtOrder/AwaitingGovtOrder";
import OrderHistory from "../../Pages/Common/OrderHistory/OrderHistory";
import DeleteOrder from "../../Pages/Common/DeleteOrder/DeleteOrder";
import RefundOrder from "../../Pages/Common/RefundOrder/RefundOrder";
import RejectedOrder from "../../Pages/Common/RejectedOrder/RejectedOrder";
import TeamWebsiteIssue from "../../Pages/Team/TeamWebsiteIssue";
import OrderDetails from "../../Pages/Common/OrderDetail/OrderDetails";
import NoMatch from "../../Pages/Common/NoMatch";

function TeamLayout() {
  return (
      <Routes>
        <Route path="/" element={<Home heading="Recent Orders" />}></Route>
        <Route path="priority-order" element={<PriorityOrder heading="Recent Orders" />}></Route>
        <Route path="pending-order" element={<PendingOrder heading="Pending Orders" />}></Route>
        <Route path="completed-order" element={<CompletedOrder heading="Completed Orders" />}></Route>
        <Route path="contact-customer" element={<ContactCustomer heading="Completed Orders" />}></Route>
        <Route path="awaiting-order" element={<AwaitingOrder heading="Pending Orders" />}></Route>
        <Route path="awaiting-govt-order" element={<AwaitingGovtOrder heading="Pending Orders" />}></Route>
        <Route path="order-history" element={<OrderHistory heading="Order History" />}></Route>
        <Route path="delete-order" element={<DeleteOrder heading="Delete Orders" />}></Route>
        <Route path="refund-order" element={<RefundOrder heading="Completed Orders" />}></Route>
        <Route path="rejected-order" element={<RejectedOrder heading="Rejected Orders" />}></Route>
        <Route path="website-issue" element={<TeamWebsiteIssue heading="User Accounts" />}></Route>
        <Route path="order-details" element={<OrderDetails heading="Order Details" />}></Route>
        <Route path="*" element={<NoMatch heading="Page Not Found" />}></Route>
      </Routes>
  );
}

export default TeamLayout;
