import React from "react";
import PageHeading from "../Common/PageHeading";

function Settings(props) {
  return (
    <>
      <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="card">
            <div class="header">
              <PageHeading pagename={props.heading} />
            </div>
            <div class="body">
              <form enctype="multipart/form-data" method="post" action="">
                <label for="gateway_name">
                  <strong>Gateway</strong>
                </label>
                <select
                  class="form-control gateway_name"
                  name="gateway_name"
                  style={{ height: "calc(3.25rem + 2px) !important" }}
                >
                  <option value="">Select Gateway</option>

                  <option value=""></option>
                </select>
                <div class="col-sm-12">
                  <br />
                  <button class="btn btn-primary" type="submit">
                    Active Gateway
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
