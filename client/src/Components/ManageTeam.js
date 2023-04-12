import React from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";

function ManageTeam(props) {
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
                action="manage_team.php?action=save"
              >
                <div class="row clearfix">
                  <div class="col-md-6">
                    <label>
                      <strong>Name</strong>
                    </label>
                    <div class="form-group">
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="Enter Name"
                        value=""
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label>
                      <strong>Email ID</strong>
                    </label>
                    <div class="form-group">
                      <input
                        type="text"
                        name="email"
                        class="form-control"
                        value=""
                        placeholder="Enter Email"
                        required
                        autocomplete="false"
                      />
                    </div>
                  </div>
                </div>
                <div class="row clearfix">
                  <div class="col-md-6">
                    <label>
                      <strong>Password</strong>
                    </label>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control required"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        autocomplete="false"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label>
                      <strong>Member Type</strong>
                    </label>
                    <div class="form-group">
                      <select
                        name="type"
                        class="form-control"
                        required
                        style={{height: '46px'}}
                      >
                        <option value="">Select Type</option>
                        <option value="Team">Team</option>
                        <option value="Telecaller">Telecaller</option>
                        <option value="Night Staff">Night Staff</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row clearfix">
                  <div class="col-md-6">
                    <label>
                      <strong>Upload Profile Picture</strong>
                    </label>
                    <div class="form-group">
                      <input
                        type="file"
                        class="form-control required"
                        id="filename"
                        name="filename"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <div class="row clearfix">
                  <div class="col-md-6">
                    <div class="form-group">
                      <button class="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Table />
    </>
  );
}

export default ManageTeam;
