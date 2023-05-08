import React, { useState, useEffect } from "react";
import PageHeader from "../../../Components/PageHeader/PageHeader";
import DTable from "../../../Components/ReactDataTable/DTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../../../Redux/orderSlice";
import useOrderListHook from "../../../Hooks/useOrderListHook";
import useAuthParameter from "../../../Hooks/useAuthParameter";

function RefundOrder(props) {
  const { param } = useAuthParameter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  let orderParam = {
    payment_status: "Success",
    process_status: ["Refund", "Complete Refunds"],
    assign_to: param.assign_to,
    page: page,
    limit: limit
  };
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading)
  const [pending, setPending] = useState(!loading);
  const orderList = useSelector((state) => state.order.orderData);
  const sideBarCount = useSelector((state) => state.order?.sideBarCount);
  const [totalRows, setTotalRows] = useState(sideBarCount?.refundCount);
  useEffect(() => {
    dispatch(getOrdersList(orderParam))
      .unwrap()
      .then((res) => {
        setPending(false);
      });
  }, [dispatch, limit, page]);

  const { rows, columns, handleChange, rowsDeleteOrder, toggleCleared, rowsRefunedOrder } =
    useOrderListHook(orderList, [], orderParam, param);

  return (
    <>
      <DTable
        orderParam={orderParam}
        orders={rows}
        columns={columns}
        teamMemeber={false}
        handleChange={handleChange}
        rowsDeleteOrder={() => rowsDeleteOrder(true)}
        pending={pending}
        toggleCleared={toggleCleared}
        rowsRefunedOrder={rowsRefunedOrder}
        setLimit={setLimit}
        setPage={setPage}
        rowsCount={totalRows}
      >
        <PageHeader pagename={props.heading} />
      </DTable>
    </>
  );
}

export default RefundOrder;
