import React from "react";
import PageHeader from "../../../Components/PageHeader/PageHeader";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAuthParameter from "../../../Hooks/useAuthParameter";
import { changePassword } from "../../../Redux/authSlice";
import { useDispatch } from "react-redux";
import { encryptVal } from "../../../utility/utility";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { MainContainer, Card, CardHeader, CardBody } from '../../Common/style'
function ChangePassword(props) {
  const { user } = useAuthParameter();
  const dispatch = useDispatch();
  let id = user?.id;
  const style = { height: "40px" };
  const initialValues = {
    password: "",
  };
  const chnagePasswordSchema = yup.object({
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password should contains atleast 8 charaters and containing uppercase, lowercase and numbers"
      ),
  });
  const updatePassword = (event) => {
    dispatch(
      changePassword({
        userId: id,
        passwordParams: { password: encryptVal(values.password) },
      })
    )
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.message, {
            className: "toast-message",
          });
        } else {
          toast.error(res.message, {
            className: "toast-message",
          });
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          className: "toast-message",
        });
      });
  };
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: chnagePasswordSchema,
    onSubmit: updatePassword,
  });
  return (
    <MainContainer className="col-lg-12 col-md-12 col-sm-12">
      <Card className="card">
        <CardHeader className="header">
          <PageHeader pagename={props.heading} />
        </CardHeader>
        <CardBody className="body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                <strong>Enter New Password</strong>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                defaultValue={values.password}
                onChange={handleChange}
                style={style}
                required="required"
              />
            </Form.Group>
            <p style={{ color: "red" }}>{errors && errors.password}</p>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Form>
        </CardBody>
      </Card>
    </MainContainer>
  );
}

export default ChangePassword;
