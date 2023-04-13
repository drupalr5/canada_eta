import React from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";
import axios from "axios";
import config from "../config.json"
import { useNavigate, useLocation } from "react-router-dom";

function OrderRender(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const deleteOrderHandler = (e) => {
    e.preventDefault();
    const oid = e.target.attributes.oid.nodeValue;
    const deleteOrder = window.confirm(`Are you sure you want to delete this order? ${oid}`);
    if (deleteOrder) {
      axios.delete(config.API_URL + '/order/delete/' + oid).then(res => {
        if(res.status == 200) {
          alert("Your order is deleted");
          navigate(location.pathname)
        }
      })
      .catch(error => {
        alert(error);
      })
    }
  }
  return(
    <>
      <Table tableHeading='' tableRows={Array.isArray(props.orders) ? props.orders.map((row, index) => {
        let id = row.id;
        let oid = row.order_id;
        let process_status = row.process_status;
        let pre_no = index+1;
        let view = `order-details?id=${oid}&oid=${id}&ot=${process_status}&pre_no=${pre_no}`;
        return <tr key={row.id}>
          <td></td>
          <td>{row.order_id}</td>
          <td>{row.passport_first_name} {row.passport_surname}</td>
          <td>{row.email}</td>
          <td>{row.telephone_number}</td>
          <td>{row.customer_date}</td>
          <td>{row.assign_to}</td>
          <td>{row.process_status}</td>
          <td><a href={view}>View</a> <a href="#" oid={oid} onClick={deleteOrderHandler}>Delete</a></td>
        </tr>
      }) : ''}>
        <PageHeading pagename={props.heading} />
      </Table>
    </>
  );
}

export default OrderRender;