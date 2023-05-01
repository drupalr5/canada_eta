import React, { useState, useEffect } from "react";
import PageHeading from "./PageHeading";
import DTable from "./DTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../../Redux/orderSlice";
import useOrderListHook from "../../Hooks/useOrderListHook";
import useAuthParameter from "../../Hooks/useAuthParameter";

function RefundOrder(props) {
  const { param } = useAuthParameter();
  let orderParam = {
    payment_status: "Success",
    process_status: ["Refund", "Complete Refunds"],
    assign_to: param.assign_to,
  };
  const dispatch = useDispatch();
  const [pending, setPending] = useState(true);
  const orderList = useSelector((state) => state.order.orderData);
  useEffect(() => {
    dispatch(getOrdersList(orderParam))
      .unwrap()
      .then((res) => {
        const timeout = setTimeout(() => {
          setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
      });
  }, [dispatch]);

  const { rows, columns, handleChange, rowsDeleteOrder, toggleCleared, rowsRefunedOrder } =
    useOrderListHook(orderList, [], orderParam, param);

  return (
    <>
      <DTable
        orders={rows}
        columns={columns}
        teamMemeber={false}
        handleChange={handleChange}
        rowsDeleteOrder={() => rowsDeleteOrder(true)}
        pending={pending}
        toggleCleared={toggleCleared}
        rowsRefunedOrder={rowsRefunedOrder}
      >
        <PageHeading pagename={props.heading} />
      </DTable>
    </>
  );
}

export default RefundOrder;
