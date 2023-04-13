import React, {useState, useEffect} from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";
import axios from "axios";
import config from "../config.json"
import { useNavigate, useLocation } from "react-router-dom";

function OrderHistory(props) {
  return (
    <>
      <Table>
        <PageHeading pagename={props.heading} />
      </Table>
    </>
  );
}

export default OrderHistory;
