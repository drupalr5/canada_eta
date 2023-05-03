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
import {
  getUserData,
  updateUser,
  uploadUserImage,
  getUsersList,
  deleteUserData,
  getUser,
} from "../../Redux/manageSlice";
import Image from "./Image";
import DTable from "../Common/DTable";
import { Link, useParams } from "react-router-dom";
import PopupModal from "./PopupModal";
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import useUserForm from "../../Hooks/useUserForm";
import { decryptVal } from "../../utility/utility";

function ManageTeam(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const singleUser = useSelector((state) => state?.manage?.manage);
  const userList = useSelector((state) => state?.manage?.list);

  const [pending, setPending] = useState(true);
  const [isShow, invokeModal] = useState(false);
  const [popupId, setPopupId] = useState(false);
  const [modelData, setModelData] = useState({});
  const inputRef = useRef(null);
  const style = { height: "40px" };

  // const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (id) {
      dispatch(getUserData(id));
    }
    dispatch(getUsersList({ type: "admin" }))
      .unwrap()
      .then((res) => {
        const timeout = setTimeout(() => {
          setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
      });
  }, [dispatch, id]);

  const initModal = (id) => {
    setPopupId(id);
    dispatch(getUser(id))
      .unwrap()
      .then((res) => {
        setModelData(res);
      });
    return invokeModal(!false);
  };
  const closeModal = () => {
    return invokeModal(!true);
  };
  let defaultInitialValues = {
    name: "",
    email: "",
    password: "",
    type: "",
    profile_path: "",
  };
  if (Object.keys(singleUser).length > 0 && id !== undefined && id !== null) {
    defaultInitialValues = {
      name: singleUser?.name,
      email: singleUser?.email,
      password: decryptVal(singleUser?.password),
      type: singleUser?.type,
      profile_path: singleUser?.profile_path,
    };
  }
  const [initialValues, setInitialValues] = useState(defaultInitialValues);
  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit
  } = useUserForm(id ? defaultInitialValues : initialValues, id, true, inputRef);
  
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
            <Link
              to="#"
              onClick={() => initModal(row.id)}
              className="blue-border"
            >
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
  const deleteUserHandler = (e) => {
    e.preventDefault();
    const id = e.target.attributes.id.nodeValue;
    const deleteOrder = window.confirm(
      `Are you sure you want to delete this user? ${id}`
    );
    if (deleteOrder) {
      dispatch(deleteUserData(id))
        .unwrap()
        .then((res) => {
          dispatch(getUsersList({ type: "admin" }));
        })
        .catch();
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
                        ref={inputRef}
                        accept="image/*"
                        onChange={(e) =>
                          setFieldValue("file", e.currentTarget.files[0])
                        }
                      />
                      <Image
                        file={values?.file}
                        defaultFiles={values.profile_path ? `http://localhost:3001/member_profile/${values.profile_path}` : ''}
                      />
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
      <PopupModal
        isShow={isShow}
        initModal={initModal}
        closeModal={closeModal}
        id={popupId}
        modelData={modelData}
      />
    </>
  );
}

export default ManageTeam;
