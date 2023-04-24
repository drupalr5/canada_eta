import React, { useState } from "react";
import PageHeading from "../Common/PageHeading";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useForm from "../../Hooks/useForm";
import useAuthParameter from "../../Hooks/useAuthParameter";
import { changePassword } from "../../Redux/authSlice";
import { useDispatch } from "react-redux";
import { encryptVal } from "../../utility/utility";

function ChangePassword(props) {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const { user } = useAuthParameter();
  const dispatch = useDispatch();
  let id = user?.id;
  const style = { height: "40px" };
  const updatePassword = (event) => {
    dispatch(
      changePassword({
        userId: id,
        passwordParams: { password: encryptVal(values.password) },
      })
    )
      .unwrap()
      .then((res) => {
        if (res.status === 1) {
          setMsg(res.message);
          setErr('')
        } else {
          setErr(res.message);
          setMsg('')
        }
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
              <p style={{color: 'red'}}>{err && err}</p>
              <p style={{color: 'green'}}>{msg && msg}</p>
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
                <p style={{color: 'red'}}>{errors && errors.password}</p>
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
