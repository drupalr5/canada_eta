import { Routes, Route } from "react-router-dom";
import Main from "../Components/Main";
import Home from "../Components/Home";
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

function UserLayout() {
  return (
    <>
    <Routes>
      <Route path="dashboard" element={<Main>
        <Home heading='Recent Orders'/>
      </Main>}></Route>
      <Route path="awaiting_order" element={<Main >
        <AwaitingOrder heading='Pending Orders'/>
      </Main>}></Route>
      <Route path="awaiting_govt_order" element={<Main >
        <AwaitingGovtOrder heading='Pending Orders'/>
      </Main>}></Route>
      <Route path="order_history" element={<Main >
        <OrderHistory heading='Order History'/>
      </Main>}></Route>
      <Route path="delete_order" element={<Main >
        <DeleteOrder heading='Delete Orders'/>
      </Main>}></Route>
      <Route path="refund_order" element={<Main >
        <RefundOrder heading='Completed Orders'/>
      </Main>}></Route>
      <Route path="rejected_order" element={<Main >
        <RejectedOrder heading='Rejected Orders'/>
      </Main>}></Route>
      <Route path="change_password" element={<Main >
        <ChangePassword heading='Update Password'/>
      </Main>}></Route>
      <Route path="settings" element={<Main >
        <Settings heading='Gateway Setting'/>
      </Main>}></Route>
      <Route path="manage_team" element={<Main >
        <ManageTeam heading='Manage Team'/>
      </Main>}></Route>
      <Route path="manage_country" element={<Main >
        <ManageCountry heading='Country Listing'/>
      </Main>}></Route>
    </Routes>
    </>
  );
}

export default UserLayout;
