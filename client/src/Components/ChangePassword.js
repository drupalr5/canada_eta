import React from "react";
import PageHeading from "./PageHeading";

function ChangePassword(props) {
  return (
    <>
      <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="card">
            <div class="header">
              <PageHeading pagename={props.heading}/>
            </div>
            <div class="body">
              <form
                enctype="multipart/form-data"
                method="post"
                action=""
              >
                <label for="password">
                  <strong>Enter New Password</strong>
                </label>
                <div class="form-group">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="Enter your password"
                    value=""
                    required
                  />
                </div>
                <div class="col-sm-12">
                  <br />
                  <button class="btn btn-primary" type="submit">
                    Update Password
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

export default ChangePassword;
