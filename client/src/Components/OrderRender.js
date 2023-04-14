import React from "react";
import Table from "./Table";
import DTable from "./DTable";
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
      let updateData = {
        process_status: "Deleted"
      }
      axios.put(config.API_URL + '/order/update/' + oid, updateData).then(res => {
        if (res.status == 200) {
          alert("Your order is deleted");
          navigate(location.pathname)
        }
      })
        .catch(error => {
          alert(error);
        })
    }
  }
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
  return (
    <>
      <DTable tableHeading='' results={result} teamMemeber={props.displayTeamMember}>
        <PageHeading pagename={props.heading} />
      </DTable>
    </>
  );
}

export default OrderRender;