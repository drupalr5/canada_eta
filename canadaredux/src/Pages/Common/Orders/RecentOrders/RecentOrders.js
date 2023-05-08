import React, { useState, useEffect } from "react";
import PageHeader from "../../PageHeader/PageHeader";
import DTable from "../../ReactDataTable/DTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../../../../Redux/orderSlice";
import useOrderListHook from "../../../../Hooks/useOrderListHook";
import useAuthParameter from "../../../../Hooks/useAuthParameter";
import { getTeamMembers } from "../../../../Redux/manageSlice";

function RecentOrders(props) {
  const { param, token } = useAuthParameter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const teamUserList = useSelector((state) => state?.manage?.list);
  let orderParam = {
    payment_status: "Success",
    process_status: "New",
    processing_type: "Standard Processing",
    doc_uploaded: 0,
    assign_to: param.assign_to,
    page: page,
    limit: limit
  };

  const loading = useSelector((state) => state.order.loading)
  const [pending, setPending] = useState(!loading);
  const orderList = useSelector((state) => state.order.orderData);
  const tilesCount = useSelector((state) => state.order?.tilesCount);
  const [totalRows, setTotalRows] = useState(tilesCount?.new_order);
  useEffect(() => {
    dispatch(getOrdersList(orderParam))
      .unwrap()
      .then((res) => {
        setPending(false);
      });
    dispatch(getTeamMembers({ type: "Team" }))
      .unwrap()
      .then((res) => { });
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
    <DTable
      orderParam={orderParam}
      orders={rows}
      columns={columns}
      teamMemeber={true}
      handleChange={handleChange}
      rowsDeleteOrder={rowsDeleteOrder}
      pending={pending}
      toggleCleared={toggleCleared}
      teamMemeberList={teamUserList}
      rowsAssignedOrder={rowsAssignedOrder}
      setLimit={setLimit}
      setPage={setPage}
      rowsCount={totalRows}
    >
      <PageHeader pagename={props.heading} />
    </DTable>
  );
}

export default RecentOrders;
