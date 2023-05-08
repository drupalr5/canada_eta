import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Allassets/vendor/bootstrap/css/bootstrap.min.css";
// import "../../Allassets/vendor/fontawesome-free/css/all.min.css";
// import "../../Allassets/assets/css/sb-css/sb-admin.css";
import backgroundImage from "../../Allassets/assets/images/canada-bg-logo.png";
import { useDispatch } from "react-redux";
import { authenticate } from "../../Redux/authSlice";
import { encryptVal } from "../../utility/utility";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { CardLogin, CardBody, CardHeader, MainContainer } from "./style";
function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const loginSchema = yup.object({
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
  useEffect(() => {
    document.body.classList.remove("theme-black");
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundRepeat = "no - repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.maxWidth = "100%";
    document.body.style.backgroundSize = "cover";
    document.title = "Admin Section";
  }, []);
  const loginHnadler = () => {
    dispatch(
      authenticate({
        email: values.email,
        password: encryptVal(values.password),
      })
    )
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success(`${res.message}`, {
            className: "toast-message",
          });
          if (res.data.type === "Admin") {
            navigate("/admin");
          } else if (res.data.type === "Team") {
            navigate("/team");
          } else if (res.data.type === "Night Staff") {
            navigate("/night_staff");
          }
        } else {
          toast.error(`${res.message}`, {
            className: "toast-message",
          });
        }
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          className: "toast-message",
        });
      });
  };
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: loginHnadler,
  });
  return (
    <>
      <MainContainer className="container">
        <CardLogin className="card card-login mx-auto mt-5">
          <CardHeader className="card-header">Login</CardHeader>
          <CardBody className="card-body">
            <form onSubmit={handleSubmit} method="post">
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    name="email"
                    className="form-control"
                    required="required"
                    autoFocus="autofocus"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <p style={{ color: "red" }}>{errors.email && errors.email}</p>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    name="password"
                    className="form-control"
                    required="required"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <p style={{ color: "red" }}>
                  {errors.password && errors.password}
                </p>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </CardBody>
        </CardLogin>
      </MainContainer>
    </>
  );
}

export default Login;
