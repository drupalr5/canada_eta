import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getOrdersList,
  updateOrdersData,
  getOrderSideBarCount,
  getOrderTiles,
  updateMultipleOrderData,
  permanentDeleteOrdersData,
  sendMail,
} from "../Redux/orderSlice";
import useAuthParameter from "./useAuthParameter";
import { toast } from "react-toastify";
import moment from "moment-timezone";
const useOrderListHook = (
  orderList,
  tablecolumns,
  orderParam,
  param,
  perDel = false
) => {
  const { type, path, usDate, usTime } = useAuthParameter();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggleCleared, setToggleCleared] = useState(false);
  let rows = [];
  Array.isArray(orderList) &&
    orderList.map((row, index) => {
      let id = row.id;
      let oid = row.order_id;
      let process_status = row.process_status;
      if (row.process_status === "Refund") {
        process_status = "Refund Incomplete";
      } else if (row.process_status === "Complete Refunds") {
        process_status = "Refund Complete";
      }
      let pre_no = index + 1;
      let view = `${path}/order-details/${oid}?oid=${id}&ot=${process_status}&pre_no=${pre_no}`;
      return rows.push({
        id: pre_no,
        order_id: oid,
        name: row.passport_first_name + " " + row.passport_surname,
        email: row.email,
        telephone: row.telephone_number,
        date: moment(row.customer_date).utc().format("MM-DD-YYYY HH:mm:ss"),
        assign_to: row.assign_to,
        status: process_status,
        action: view,
      });
    });

  const deleteOrderHandler = (e) => {
    e.preventDefault();
    const oid = e.target.attributes.oid.nodeValue;
    const deleteOrder = window.confirm(
      `Are you sure you want to delete this order? ${oid}`
    );
    if (deleteOrder) {
      let updateData = {
        process_status: "Deleted",
      };
      let callback;
      if (perDel === true) {
        callback = permanentDeleteOrdersData(oid);
      } else {
        callback = updateOrdersData({ order_id: oid, data: updateData });
      }
      dispatch(callback)
        .unwrap()
        .then((res) => {
          if (res.status === 200) {
            toast.success(`Order has been deleted successfully`, {
              className: "toast-message",
            });
            dispatch(getOrderTiles(param));
            dispatch(getOrderSideBarCount(param));
            dispatch(getOrdersList(orderParam));
          } else {
            toast.error(`${res.message}`, {
              className: "toast-message",
            });
          }
        })
        .catch();
    }
  };

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const rowsAssignedOrder = (teamMember) => {
    if (selectedRows.length > 0) {
      const oids = [];
      if (selectedRows.length > 0) {
        selectedRows.map((r) => oids.push(r.order_id));
      }
      // setPending(true)
      if (
        window.confirm(
          `Are you sure you want to assign this order to selected team member:\r ${
            oids.length ? oids.map((r) => r) : ""
          } ?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        let updateData = {
          assign_to: teamMember,
          assign_date: usDate,
          assign_time: usTime,
        };
        dispatch(
          updateMultipleOrderData({
            data: updateData,
            params: {
              oids: oids,
            },
          })
        )
          .unwrap()
          .then((res) => {
            if (res.status === 200) {
              toast.success(
                `Selected orders has been assigned to team member successfully`,
                {
                  className: "toast-message",
                }
              );
              setSelectedRows(false);
            } else {
              toast.error(`${res.message}`, {
                className: "toast-message",
              });
            }
          })
          .catch();
      }
    } else {
      toast.error(`Select minimum 1 rows`, {
        className: "toast-message",
      });
    }
  };
  const rowsRefunedOrder = () => {
    if (selectedRows.length > 0) {
      const oids = [];
      if (selectedRows.length > 0) {
        selectedRows.map((r) => oids.push(r.order_id));
      }
      // setPending(true)
      if (
        window.confirm(
          `Are you sure you want to refund this order:\r ${
            oids.length ? oids.map((r) => r) : ""
          } ?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        let updateData = {
          process_status: "Complete Refunds",
          refund_date: `${usDate} ${usTime}`,
        };
        dispatch(
          updateMultipleOrderData({
            data: updateData,
            params: {
              oids: oids,
            },
          })
        )
          .unwrap()
          .then((res) => {
            if (res.status === 200) {
              dispatch(getOrdersList(orderParam));
              dispatch(sendMail());
              toast.success(`Selected orders has been refund successfully`, {
                className: "toast-message",
              });
              setSelectedRows(false);
            } else {
              toast.error(`${res.message}`, {
                className: "toast-message",
              });
            }
          })
          .catch();
      }
    } else {
      toast.error(`Select minimum 1 rows`, {
        className: "toast-message",
      });
    }
  };
  const rowsDeleteOrder = (docupload = false) => {
    if (selectedRows.length > 0) {
      const oids = [];
      if (selectedRows.length > 0) {
        selectedRows.map((r) => oids.push(r.order_id));
      }
      // setPending(true)
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${
            oids.length ? oids.map((r) => r) : ""
          } ?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        let updateData = {
          process_status: "Deleted",
        };
        if (docupload === true) {
          updateData.doc_uploaded = 0;
        }
        let callback;
        if (perDel === true) {
          callback = permanentDeleteOrdersData(oids);
        } else {
          callback = updateMultipleOrderData({
            data: updateData,
            params: {
              oids: oids,
            },
          });
        }
        dispatch(callback)
          .unwrap()
          .then((res) => {
            if (res.status === 200) {
              toast.success(`Selected orders has been deleted successfully`, {
                className: "toast-message",
              });
              dispatch(getOrderTiles(param));
              dispatch(getOrderSideBarCount(param));
              dispatch(getOrdersList(orderParam));
              setSelectedRows(false);
            } else {
              toast.error(`${res.message}`, {
                className: "toast-message",
              });
            }
          })
          .catch();
      }
    } else {
      toast.error(`Select minimum 1 rows`, {
        className: "toast-message",
      });
    }
  };
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
        name: "Date & Time",
        selector: (row) => row.date,
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
              <Link to={row.action} className="blue-border">
                View
              </Link>
              {" | "}
              {type === "Admin" && (
                <Link className="blue-border" to="#" onClick={deleteOrderHandler} oid={row.order_id}>
                  Delete
                </Link>
              )}
            </span>
          ) : (
            " "
          ),
      },
    ];
  }
  return {
    rows,
    columns,
    handleChange,
    rowsDeleteOrder,
    toggleCleared,
    rowsAssignedOrder,
    rowsRefunedOrder,
  };
};
export default useOrderListHook;
