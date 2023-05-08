import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as yup from "yup";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/manageSlice";
import Image from "./Image";
import useUserForm from "../../Hooks/useUserForm";
import { encryptVal, decryptVal } from "../../utility/utility";
const profileFolder = '/assests/uploads/member_profile/';
function PopupModal({ isShow, initModal, closeModal, id, modelData }) {
  // const [msg, setMsg] = useState("");
  const [defaultOption, setDefaultOption] = useState({});
  const style = { height: "40px" };
  const dispatch = useDispatch();

  let initialValues = {
    name: modelData?.name,
    email: modelData?.email,
    password: decryptVal(modelData?.password),
    type: modelData?.type,
    profile_path: modelData?.profile_path,
  };
  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    msg,
    err,
  } = useUserForm(initialValues, id);
  return (
    <>
      <Modal size="lg" show={isShow}>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Body>
            <p style={{ color: "green" }}>{msg && msg}</p>
            <p style={{ color: "red" }}>{err && err}</p>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formText">
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
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formSelect">
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
                  <Form.Control
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue("file", e.currentTarget.files[0])
                    }
                  />
                  {values.profile_path &&
                    <Image
                      file={values.file}
                      defaultFiles={values.profile_path ? `${profileFolder}${values.profile_path}` : ''}
                    />
                  }
                </Form.Group>
                <p style={{ color: "red" }}>{errors.file}</p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="danger" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
export default PopupModal;
