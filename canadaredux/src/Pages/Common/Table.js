import React from "react";

function Table(props) {
  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="header">
              {props.children}
            </div>
            <div className="body">
              <form
                encType="multipart/form-data"
                method="post"
                action="recent_order.php?action=assign"
              >
                <div className="table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover js-basic-example dataTable"
                    id="completedOrderTable"
                  >
                    <thead>
                      <tr>
                      <th>
                      <input
                        type="checkbox"
                        className="datatable-select-all-checkbox"
                      />
                    </th>
                    <th>Order ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Date & Time</th>
                    <th>Assign to</th>
                    <th>Status</th>
                    <th>Action</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                      <th>
      <input
        type="checkbox"
        className="datatable-select-all-checkbox"
      />
    </th>
    <th>Order ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Telephone</th>
    <th>Date & Time</th>
    <th>Assign to</th>
    <th>Status</th>
    <th>Action</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      
                    {props.tableRows}
                    </tbody>
                  </table>
                </div>
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 col-sm-12 m-b-20">
                    <b>Team Member</b>
                    <select className="form-control show-tick" name="team">
                      <option value="">Select Team Member</option>
                      <option value="<"></option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  name="submit"
                  value="Assign"
                  className="btn btn-success"
                >
                  Assign To
                </button>
                <button
                  type="submit"
                  name="submit"
                  value="Delete"
                  className="btn btn-success"
                >
                  Delete Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
