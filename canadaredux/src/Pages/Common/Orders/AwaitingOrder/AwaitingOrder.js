import React, { useState, useEffect } from "react";
import PageHeader from "../../PageHeader/PageHeader";
import DTable from "../../ReactDataTable/DTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../../../../Redux/orderSlice";
import useOrderListHook from "../../../../Hooks/useOrderListHook";
import useAuthParameter from "../../../../Hooks/useAuthParameter";

function AwaitingOrder(props) {
  const { param } = useAuthParameter();
  let orderParam = {
    payment_status: 'Success',
    process_status: 'Awiating',
    assign_to: param.assign_to,
  }
  const dispatch = useDispatch();
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

  const { rows, columns, handleChange, rowsDeleteOrder, toggleCleared } = useOrderListHook(orderList, [], orderParam, param)

  return (
    <>
      <DTable orders={rows}
        columns={columns}
        teamMemeber={false}
        handleChange={handleChange}
        rowsDeleteOrder={rowsDeleteOrder}
        pending={pending}
        toggleCleared={toggleCleared}
      >
        <PageHeader pagename={props.heading} />
      </DTable>
    </>
  );
}

export default AwaitingOrder;
