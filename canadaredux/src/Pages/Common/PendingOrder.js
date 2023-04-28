import React, { useState, useEffect } from "react";
import PageHeading from "./PageHeading";
import DTable from "./DTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../../Redux/orderSlice";
import useOrderListHook from "../../Hooks/useOrderListHook";
import useAuthParameter from "../../Hooks/useAuthParameter";

function PendingOrder(props) {
  const { param, token } = useAuthParameter();
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order.orderData);
  let orderParam = {
    payment_status: "Success",
    process_status: "Pending",
    doc_uploaded: 1,
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
  }, [dispatch, token]);

  const { rows, columns, handleChange, rowsDeleteOrder, toggleCleared } =
    useOrderListHook(orderList, [], orderParam, param);

  return (
    <>
      <DTable
        orders={rows}
        columns={columns}
        teamMemeber={false}
        handleChange={handleChange}
        rowsDeleteOrder={rowsDeleteOrder}
        pending={pending}
        toggleCleared={toggleCleared}
      >
        <PageHeading pagename={props.heading} />
      </DTable>
    </>
  );
}

export default PendingOrder;
