import React from "react";
import Table from "./Table";
import DTable from "./DTable";
import PageHeading from "./PageHeading";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteOrdersData } from "../../Redux/orderSlice"
import { useDispatch } from "react-redux";
function OrderRender(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const result = [];
  Array.isArray(props.orders) && props.orders.map((row, index) => {
    let id = row.id;
    let oid = row.order_id;
    let process_status = row.process_status;
    let pre_no = index + 1;
    let view = `order-details?id=${oid}&oid=${id}&ot=${process_status}&pre_no=${pre_no}`;
    result.push(
      {
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
      console.log("d")
      dispatch(deleteOrdersData({order_id: oid, data:updateData}))
      .unwrap()
      .then()
      .catch()
      // axios.put(config.API_URL + '/order/update/' + oid, updateData).then(res => {
      //   if (res.status == 200) {
      //     alert("Your order is deleted");
      //     navigate(location.pathname)
      //   }
      // })
      //   .catch(error => {
      //     alert(error);
      //   })
    }
  }
  const columns = [
    {
      name: "Order ID",
      selector: row => row.order_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true
    },
    {
      name: "Telephone",
      selector: row => row.telephone,
      sortable: true
    },
    {
      name: "Assign to",
      selector: row => row.assign_to,
      sortable: true
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true
    },
    {
      name: "Action",
      selector: (row) =>
        result?.length ? (
          <span>
            <Link
              to={`/order-details?id=${row.order_id}&oid=${row.id}&ot=${row.status}&pre_no=${row.id}`}
              className="blue-border"
            >
              View
            </Link>{" | "}
            <Link
              to="#"
              onClick={deleteOrderHandler}
              oid={row.order_id}
            >
              Delete
            </Link>
          </span>
        ) : (
          " "
        ),
    }
  ];
  return (
    <>
      <DTable tableHeading='' results={result} teamMemeber={props.displayTeamMember} columns={columns}>
        <PageHeading pagename={props.heading} />
      </DTable>
    </>
  );
}

export default OrderRender;