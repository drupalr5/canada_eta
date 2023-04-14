import React, { useState, useEffect } from "react";
import Table from "./Table";
import PageHeading from "./PageHeading";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import useForm from "../Hooks/useForm";
// import { useForm } from "react-hook-form";
import { useFormik } from "formik";
import * as yup from "yup";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import config from "../config.json";

function ManageTeam(props) {
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");
  let loginUser = JSON.parse(localStorage.getItem("user"));
  let id = loginUser.id;
  const style = { height: "40px" };
  // const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    axios
      .get(`${config.API_URL}/admin/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [id]);
  const updateHandler = (data) => {
    console.log(data);
    axios
      .put(`${config.API_URL}/admin/update/${id}`, {params :data})
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Success...") {
          setMsg("Updated user succusessfully");
        } else {
          setMsg(response.data.message);
        }
      })
      .catch((error) => {
        setMsg(error);
      });
  };
  const foundOrderSchema = yup.object({
    // orderId: yup.string().required("Please enter your Order Id"),
    email: yup
      .string()
      .required("Please enter your Email Id")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter correct Email Id"
      ),
      password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers"
      ),
  });
  const initialValues = {
    "id": 1,
    "name": "Admin",
    "email": "teams@canada-eta.online",
    "password": "wynzac-rafzos-8pIhb",
    "type": "Admin",
    "profile_path": null,
    "create_ts": "2020-04-30T09:16:41.000Z"
}
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: foundOrderSchema,
    onSubmit: updateHandler,
  });
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
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formText">
                      <Form.Label>
                        <strong>Name</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={values.name}
                        style={style}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>
                        <strong>Email ID</strong>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleChange}
                        style={style}
                      />
                    </Form.Group>
                    <p>{errors.email}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                        style={style}
                      />
                    </Form.Group>
                    <p>{errors.password}</p>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formSelect">
                      <Form.Label>
                        <strong>Member Type</strong>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="type"
                        value={values.type}
                        className="form-control"
                        onChange={handleChange}
                        style={style}
                      >
                        <option value="">Select Type</option>
                        <option value="Team">Team</option>
                        <option value="Telecaller">Telecaller</option>
                        <option value="Night Staff">Night Staff</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formFile">
                      <Form.Label>Upload Profile Picture</Form.Label>
                      <Form.Control
                        type="file"
                        name="password"
                        placeholder="Enter Password"
                      />
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Table />
    </>
  );
}

export default ManageTeam;
