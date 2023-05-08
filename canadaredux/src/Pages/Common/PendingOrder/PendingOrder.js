import React, { useState, useEffect } from "react";
import PageHeader from "../../../Components/PageHeader/PageHeader";
import DTable from "../../../Components/ReactDataTable/DTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../../../Redux/orderSlice";
import useOrderListHook from "../../../Hooks/useOrderListHook";
import useAuthParameter from "../../../Hooks/useAuthParameter";

function PendingOrder(props) {
  const { param, token } = useAuthParameter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  let orderParam = {
    payment_status: "Success",
    process_status: "Pending",
    doc_uploaded: 1,
    assign_to: param.assign_to,
    page: page,
    limit: limit
  };

  const loading = useSelector((state) => state.order.loading)
  const [pending, setPending] = useState(!loading);
  const orderList = useSelector((state) => state.order.orderData);
  const tilesCount = useSelector((state) => state.order?.tilesCount);
  const [totalRows, setTotalRows] = useState(tilesCount?.pending_order);
  useEffect(() => {
    dispatch(getOrdersList(orderParam))
      .unwrap()
      .then((res) => {
        setPending(false);
      });
  }, [dispatch, limit, page]);

  const { rows, columns, handleChange, rowsDeleteOrder, toggleCleared } =
    useOrderListHook(orderList, [], orderParam, param);

  return (
    <>
      <DTable
        orderParam={orderParam}
        orders={rows}
        columns={columns}
        teamMemeber={false}
        handleChange={handleChange}
        rowsDeleteOrder={rowsDeleteOrder}
        pending={pending}
        toggleCleared={toggleCleared}
        setLimit={setLimit}
        setPage={setPage}
        rowsCount={totalRows}
      >
        <PageHeader pagename={props.heading} />
      </DTable>
    </>
  );
}

export default PendingOrder;
