import React, { useState } from "react";
import PageHeading from "../Common/PageHeading";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useForm from "../../Hooks/useForm";
import config from "../../config.json"

function ChangePassword(props) {
  const [msg, setMsg] = useState("");

  const style = { height: "40px" };
  const updatePassword = (event) => {
    // event.preventDefault();
    let loginUser = JSON.parse(localStorage.getItem("user"));
    let id = loginUser.id;
    axios
      .put(`${ config.API_URL }/admin/update/${id}`, {
        params: { password: values.password },
      })
      .then((response) => {
        if (response.data.message === "Success...") {
          setMsg("Password updated succusessfully");
        } else {
          setMsg(response.data.message);
        }
      })
      .catch((error) => {
        setMsg(error);
      });
  };
  const { handleChange, values, errors, handleSubmit } =
    useForm(updatePassword);
  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="header">
              <PageHeading pagename={props.heading} />
            </div>
            <div className="body">
              <Form onSubmit={handleSubmit}>
                {msg && msg}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <strong>Enter New Password</strong>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    style={style}
                  />
                </Form.Group>
                <p>{errors && errors.password}</p>
                <Button variant="primary" type="submit">
                  Update Password
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
