import React, { useState,useEffect } from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";
import axios from "axios";
import config from "../config.json"

function ContactCustomer(props) {
  const [contactCustomer, setContactCustomer] = useState({});

  useEffect(() => { 
    let param = {
      payment_status: 'Success',
      process_status: 'Contact Customer',
      limit: 100
    }
    axios.get(config.API_URL + '/order/get',{params: param}).then((response) => {
      setContactCustomer(response.data)
    }).catch((error) => {
      alert(error);
    });
  }, [])
  
  return (
    <>
      <Table tableHeading='' tableRows={Array.isArray(contactCustomer) ? contactCustomer.map((row) => {
        return <tr key={row.id}>
          <td></td>
          <td>{row.order_id}</td>
          <td>{row.passport_first_name} {row.passport_surname}</td>
          <td>{row.email}</td>
          <td>{row.telephone_number}</td>
          <td>{row.customer_date}</td>
          <td>{row.assign_to}</td>
          <td>{row.process_status}</td>
          <td><a href='order_details'>View</a> <a >Delete</a></td>
        </tr>
      }) : ''}>
        <PageHeading pagename={props.heading} />
      </Table>
    </>
  );
}

export default CompletedOrder;
