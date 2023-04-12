import React from "react";

function TopBar() {
  return (
    <>
      <div className="row clearfix main-folder-section">
        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="recent_order.php">
              <div className="body">
                <p className="m-b-20">
                  <img src="https://canada-eta.online/admin/assets/images/new_order.svg" alt="" />
                </p>
                <span>New Orders</span>
                <h3
                  className="m-b-10"
                  data-from="0"
                  data-to="0"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                  0
                </h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="priority_order.php">
              <div className="body">
                <p className="m-b-20">
                  <img src="https://canada-eta.online/admin/assets/images/new_order.svg" alt=""/>
                </p>
                <span>Priority Orders</span>
                <h3
                  className="m-b-10 number count-to"
                  data-from="0"
                  data-to="1"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                  1
                </h3>
              </div>
            </a>
          </div>
        </div>

        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="pending_order.php">
              <div className="body">
                <p className="m-b-20">
                  <img src="https://canada-eta.online/admin/assets/images/pending_order.svg" alt=""/>
                </p>
                <span>Pending Orders</span>
                <h3
                  className="m-b-10 number count-to"
                  data-from="0"
                  data-to="5"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                  5
                </h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="completed_order.php">
              <div className="body">
                <p className="m-b-20">
                  <img src="https://canada-eta.online/admin/assets/images/completed_order.svg" alt=""/>
                </p>
                <span>Completed Orders</span>
                <h3
                  className="m-b-10 number count-to"
                  data-from="0"
                  data-to="9688"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                  9688
                </h3>
              </div>
            </a>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 top-folder">
          <div className="card text-center">
            <a href="contact_customer.php">
              <div className="body">
                <p className="m-b-20">
                  <img src="https://canada-eta.online/admin/assets/images/contact_customer.svg" alt=""/>
                </p>
                <span>Contact Customer</span>
                <h3
                  className="m-b-10 number count-to"
                  data-from="0"
                  data-to="70"
                  data-speed="2000"
                  data-fresh-interval="700"
                >
                  70
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
