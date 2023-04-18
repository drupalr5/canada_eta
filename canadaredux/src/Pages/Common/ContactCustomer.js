import React, { useState, useEffect } from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";
import axios from "axios";
import config from "../../config.json"
import OrderRender from "./OrderRender";

function ContactCustomer(props) {
  const [contactCustomer, setContactCustomer] = useState({});
  let loginUser = JSON.parse(localStorage.getItem("user"));
  let utype = loginUser.type ? loginUser.type : ''
  if (utype && utype != "Team") {
    utype = null
  }
  useEffect(() => {
    let param = {
      payment_status: 'Success',
      process_status: 'Contact Customer',
      assign_to: utype
    }
    axios.get(config.API_URL + '/order/get', { params: param }).then((response) => {
      setContactCustomer(response.data)
    }).catch((error) => {
      alert(error);
    });
  }, [])

  return (
    <>
      <OrderRender heading={props.heading} tableHeading="" orders={contactCustomer} />
    </>
  );
}

export default ContactCustomer;
