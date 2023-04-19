import { Link } from "react-router-dom";
const useOrderListHook = (orderList, tablecolumns, deleteOrderHandler) => {
  let rows = [];
  Array.isArray(orderList) &&
    orderList.map((row, index) => {
      let id = row.id;
      let oid = row.order_id;
      let process_status = row.process_status;
      let pre_no = index + 1;
      let view = `order-details?id=${oid}&oid=${id}&ot=${process_status}&pre_no=${pre_no}`;
      rows.push({
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
                to={`/order-details?id=${row.order_id}&oid=${row.id}&ot=${row.status}&pre_no=${row.id}`}
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

  return { rows, columns };
};
export default useOrderListHook;
