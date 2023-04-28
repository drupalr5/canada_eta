import React, { useState, useEffect } from "react";
import PageHeading from "./PageHeading";
import DTable from "./DTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../../Redux/orderSlice";
import useOrderListHook from "../../Hooks/useOrderListHook";
import useAuthParameter from "../../Hooks/useAuthParameter";
import { getTeamMembers } from "../../Redux/manageSlice";

function PriorityOrder(props) {
  const { param, token } = useAuthParameter();
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order.orderData);
  const teamUserList = useSelector((state) => state?.manage?.list);
  let orderParam = {
    payment_status: "Success",
    process_status: "New",
    doc_uploaded: 0,
    processing_type: "Priority Processing",
    assign_to: param.assign_to,
  };

  useEffect(() => {
    dispatch(getOrdersList(orderParam))
      .unwrap()
      .then((res) => {
        const timeout = setTimeout(() => {
          setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
      });
    dispatch(getTeamMembers({ type: "Team" }))
      .unwrap()
      .then((res) => {});
  }, [dispatch, token]);

  const {
    rows,
    columns,
    handleChange,
    rowsDeleteOrder,
    toggleCleared,
    rowsAssignedOrder,
  } = useOrderListHook(orderList, [], orderParam, param);
  return (
    <>
      <DTable
        orders={rows}
        columns={columns}
        teamMemeber={true}
        handleChange={handleChange}
        rowsDeleteOrder={rowsDeleteOrder}
        pending={pending}
        toggleCleared={toggleCleared}
        teamMemeberList={teamUserList}
        rowsAssignedOrder={rowsAssignedOrder}
      >
        <PageHeading pagename={props.heading} />
      </DTable>
    </>
  );
}

export default PriorityOrder;
