import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrdersList,
  updateOrdersData,
  getOrderSideBarCount,
  getOrderTiles,
  updateMultipleOrderData
 } from "../Redux/orderSlice";
 import useAuthParameter from "./useAuthParameter";
const useOrderListHook = (orderList, tablecolumns, orderParam, param) => {
  const { path } = useAuthParameter();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggleCleared, setToggleCleared] = useState(false);
  let rows = [];
  Array.isArray(orderList) &&
    orderList.map((row, index) => {
      let id = row.id;
      let oid = row.order_id;
      let process_status = row.process_status;
      let pre_no = index + 1;
      let view = `${path}/order-details/${oid}?oid=${id}&ot=${process_status}&pre_no=${pre_no}`;
      return rows.push({
        id: pre_no,
        order_id: oid,
        name: row.passport_first_name + " " + row.passport_surname,
        email: row.email,
        telephone: row.telephone_number,
        assign_to: row.assign_to,
        status: process_status,
        action: view,
      }
      );
    });

  const deleteOrderHandler = (e) => {
    e.preventDefault();
    const oid = e.target.attributes.oid.nodeValue;
    const deleteOrder = window.confirm(`Are you sure you want to delete this order? ${oid}`);
    if (deleteOrder) {
      let updateData = {
        process_status: "Deleted"
      }
      dispatch(updateOrdersData({ order_id: oid, data: updateData }))
        .unwrap()
        .then((res) => {
          dispatch(getOrderTiles(param))
          dispatch(getOrderSideBarCount(param))
          dispatch(getOrdersList(orderParam))
        })
        .catch()
    }
  }

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  }

  const rowsDeleteOrder = () => {
    if (selectedRows.length > 0) {
      const oids = [];
      if (selectedRows.length > 0) {
        selectedRows.map(r => oids.push(r.order_id));
      }
      // setPending(true)
      if (window.confirm(`Are you sure you want to delete:\r ${oids.length ? oids.map(r => r) : ''} ?`)) {
        setToggleCleared(!toggleCleared);
        let updateData = {
          process_status: "Deleted"
        }
        dispatch(updateMultipleOrderData({
          data: updateData,
          params: {
            "oids": oids
          }
        }
        ))
          .unwrap()
          .then((res) => {
            dispatch(getOrderTiles(param))
            dispatch(getOrderSideBarCount(param))
            dispatch(getOrdersList(orderParam))
            setSelectedRows(false);
          })
          .catch()
      }
    }
  }
  let columns = tablecolumns;
  if (tablecolumns.length == 0) {
    columns = [
      {
        name: "Order ID",
        selector: (row) => row.order_id,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Telephone",
        selector: (row) => row.telephone,
        sortable: true,
      },
      {
        name: "Assign to",
        selector: (row) => row.assign_to,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
      },
      {
        name: "Action",
        selector: (row) =>
          rows?.length ? (
            <span>
              <Link
                to={row.action}
                className="blue-border"
              >
                View
              </Link>
              {" | "}
              <Link to="#" onClick={deleteOrderHandler} oid={row.order_id}>
                Delete
              </Link>
            </span>
          ) : (
            " "
          ),
      },
    ];
  }
  return { rows, columns, handleChange, rowsDeleteOrder, toggleCleared };
};
export default useOrderListHook;
