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
  const dispatch = useDispatch();
  const teamUserList = useSelector((state) => state?.manage?.list);
  let orderParam = {
    payment_status: "Success",
    process_status: "New",
    doc_uploaded: 0,
    processing_type: "Priority Processing",
    assign_to: param.assign_to,
  };

  const loading = useSelector((state) => state.order.loading)
  const [pending, setPending] = useState(!loading);
  const orderList = useSelector((state) => state.order.orderData);
  useEffect(() => {
    dispatch(getOrdersList(orderParam))
      .unwrap()
      .then((res) => {
        setPending(false);
      });
  }, [dispatch]);

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
