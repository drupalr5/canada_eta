import React, { useState, useEffect } from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";
import axios from "axios";

function ManageTeam(props) {
  const [user, setUser] = useState({});
  let loginUser = JSON.parse(localStorage.getItem("user"));
  let id = loginUser.id
  useEffect(() => {    
    axios.get(`http://localhost:3001/api/admin/${id}`).then((response) => {
      setUser(response.data)
    }).catch((error) => {
      alert(error);
    });
  }, [id]);
  const updateHandler = () => {
    axios.get(`http://localhost:3001/api/admin/update/${id}`,user).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      alert(error);
    });
  }
  console.log(id)
  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="header">
              <PageHeading pagename={props.heading} />
            </div>
            <div className="body">
              <form
              encType="multipart/form-data"
              onSubmit={updateHandler}
              >
                <div className="row clearfix">
                  <div className="col-md-6">
                    <label>
                      <strong>Name</strong>
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        value={user.name}
                        required                        
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label>
                      <strong>Email ID</strong>
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={user.email}
                        placeholder="Enter Email"
                        required
                        autoComplete="false"
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-6">
                    <label>
                      <strong>Password</strong>
                    </label>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control required"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        autoComplete="false"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label>
                      <strong>Member Type</strong>
                    </label>
                    <div className="form-group">
                      <select
                        name="type"
                        className="form-control"
                        required
                        style={{ height: "46px" }}
                        value={user.type}
                      >
                        <option value="">Select Type</option>
                        <option value="Team">Team</option>
                        <option value="Telecaller">Telecaller</option>
                        <option value="Night Staff">Night Staff</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-6">
                    <label>
                      <strong>Upload Profile Picture</strong>
                    </label>
                    <div className="form-group">
                      <input
                        type="file"
                        className="form-control required"
                        id="filename"
                        name="filename"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-6">
                    <div className="form-group">
                      <button className="btn btn-primary" type="submit">
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
