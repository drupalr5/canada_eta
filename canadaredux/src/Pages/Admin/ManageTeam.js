import React, { useState, useEffect, useRef } from "react";
import PageHeading from "../Common/PageHeading";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as yup from "yup";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import useAuthParameter from "../../Hooks/useAuthParameter";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUser, getUsersList } from "../../Redux/manageSlice";
import Image from "./Image";
import DTable from "../Common/DTable";
import { Link } from "react-router-dom";

function ManageTeam(props) {
  const [msg, setMsg] = useState("");
  const [defaultOption, setDefaultOption] = useState({});
  const [pending, setPending] = useState(true);
  const { user } = useAuthParameter();
  const id = user?.id;
  const singleUser = useSelector((state) => state?.manage?.manage);
  const userList = useSelector((state) => state?.manage?.list);

  const style = { height: "40px" };
  const dispatch = useDispatch();
  // const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(getUserData(id))
      .unwrap()
      .then((res) => {
        setDefaultOption(res);
      });
    dispatch(getUsersList({ type: "admin" }))
      .unwrap()
      .then((res) => {
        const timeout = setTimeout(() => {
          setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
      });
  }, [dispatch]);
  const updateHandler = () => {
    console.log(values);
    dispatch(updateUser({ id: id, values: values }))
      .unwrap()
      .then((res) => {});
    //   console.log(data);
    //   data.profile_path = values.fileUpload && values.fileUpload.name;
    //   axios
    //     .put(`${config.API_URL}/admin/update/${id}`, {params :data})
    //     .then((response) => {
    //       console.log(response.data);
    //       if (response.data.message === "Success...") {
    //         setMsg("Updated user succusessfully");
    //       } else {
    //         setMsg(response.data.message);
    //       }
    //     })
    //     .catch((error) => {
    //       setMsg(error);
    //     });
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
  let initialValues = {};
  if (typeof singleUser !== "undefined") {
    initialValues = {
      name: singleUser?.name,
      email: singleUser?.email,
      password: singleUser?.password,
      type: singleUser?.type,
      profile_path: singleUser?.profile_path,
    };
  } else {
    initialValues = {
      name: defaultOption?.name,
      email: defaultOption?.email,
      password: defaultOption?.password,
      type: defaultOption?.type,
      profile_path: defaultOption?.profile_path,
    };
  }
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: foundOrderSchema,
    onSubmit: updateHandler,
  });
  let columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) =>
        rows?.length ? (
          <span>
            <Link to="#" className="blue-border">
              Edit
            </Link>
            {" | "}
            <Link to="#" onClick={deleteUserHandler} id={row.id}>
              Delete
            </Link>
          </span>
        ) : (
          " "
        ),
    },
  ];
  let rows = [];
  Array.isArray(userList) &&
    userList.map((row, index) => {
      return rows.push({
        id: row.id,
        name: row.name,
        email: row.email,
        type: row.type,
      });
    });
  const deleteUserHandler = (e) => {
    e.preventDefault();
    const id = e.target.attributes.id.nodeValue;
    const deleteOrder = window.confirm(
      `Are you sure you want to delete this user? ${id}`
    );
    if (deleteOrder) {
      // dispatch(deleteOrdersData({ id: id}))
      //   .unwrap()
      //   .then((res) => {
      //     dispatch(getOrderTiles(param));
      //     dispatch(getOrderSideBarCount(param));
      //     dispatch(getOrdersList(orderParam));
      //   })
      //   .catch();
    }
  };
  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="header">
              <PageHeading pagename={props.heading} />
            </div>
            <div className="body">
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <p style={{ color: "red" }}>{errors.email}</p>
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
                    <p style={{ color: "red" }}>{errors.password}</p>
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
                        name="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFieldValue("file", e.currentTarget.files[0])
                        }
                      />
                      <Image file={values.file} />
                    </Form.Group>
                    <p style={{ color: "red" }}>{errors.file}</p>
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
      <DTable
        orders={rows}
        columns={columns}
        teamMemeber={false}
        // handleChange={handleChange}
        // rowsDeleteOrder={rowsDeleteOrder}
        pending={pending}
        selectableRows={false}
        // toggleCleared={toggleCleared}
      >
        <PageHeading pagename="Manage Team List" />
      </DTable>
    </>
  );
}

export default ManageTeam;
