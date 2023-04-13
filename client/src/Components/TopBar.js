import React, { useState,useEffect } from "react";
import axios from "axios";
import config from "../config.json"
import NewOrderImage from "../Allassets/assets/images/new_order.svg";
import PendingOrderImage from "../Allassets/assets/images/pending_order.svg";
import CompletedOrderImage from "../Allassets/assets/images/completed_order.svg";
import ContactOrderImage from "../Allassets/assets/images/contact_customer.svg";

function TopBar() {
  const [tiles, setTiles] = useState({});
  useEffect(() => {
    axios.get(config.API_URL + '/order/ordertiles').then((response) => {
      setTiles(response.data)
    }).catch((error) => {
      alert(error);
    });
  }, [])
  return (
    <>
      <div className="row clearfix main-folder-section">
        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="dashboard">
              <div className="body">
                <p className="m-b-20">
                  <img src={NewOrderImage} alt="Order Logo" />
                </p>
                <span>New Orders</span>
                <h3
                  className="m-b-10"
                  data-from="0"
                  data-to="0"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                  {tiles.new_order}
                </h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="priority-order">
              <div className="body">
                <p className="m-b-20">
                  <img src={PendingOrderImage} alt="Priority Orders"/>
                </p>
                <span>Priority Orders</span>
                <h3
                  className="m-b-10 number count-to"
                  data-from="0"
                  data-to="1"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                {tiles.priority_order}
                </h3>
              </div>
            </a>
          </div>
        </div>

        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="pending-order">
              <div className="body">
                <p className="m-b-20">
                  <img src={PendingOrderImage} alt="Pending Orders"/>
                </p>
                <span>Pending Orders</span>
                <h3
                  className="m-b-10 number count-to"
                  data-from="0"
                  data-to="5"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                {tiles.pending_order}
                </h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="completed-order">
              <div className="body">
                <p className="m-b-20">
                  <img src={CompletedOrderImage} alt="Completed Order"/>
                </p>
                <span>Completed Orders</span>
                <h3
                  className="m-b-10 number count-to"
                  data-from="0"
                  data-to="9688"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                {tiles.complete_order}
                </h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="contact-customer">
              <div className="body">
                <p className="m-b-20">
                  <img src={ContactOrderImage} alt="Contact Order"/>
                </p>
                <span>Contact Customer</span>
                <h3
                  className="m-b-10 number count-to"
                  data-from="0"
                  data-to="70"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                {tiles.customer_contact}
                </h3>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default TopBar;
