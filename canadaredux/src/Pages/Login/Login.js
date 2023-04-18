import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Allassets/vendor/bootstrap/css/bootstrap.min.css";
import "../../Allassets/vendor/fontawesome-free/css/all.min.css";
import "../../Allassets/assets/css/sb-css/sb-admin.css";
import useForm from "../../Hooks/useForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authenticate } from "../../Redux/authSlice";
function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.remove("theme-black");
  }, []);
  const loginHnadler = () => {
    // console.log(values)
    dispatch(authenticate(values))
      .unwrap()
      .then((res) => {
        if (res.status === 1) {
          if (res.data.type == "Admin") {
            navigate("/admin");
          } else if (res.data.type == "Team") {
            navigate("/team");
          } else if (res.data.type == "Night Staff") {
            navigate("/staff");
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { handleChange, values, errors, handleSubmit } = useForm(loginHnadler);
  useEffect(() => {
    document.body.style.backgroundImage =
      'url("https://canada-eta.online/admin/assets/images/canada-bg-logo.png")';
    document.body.style.backgroundRepeat = "no - repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.maxWidth = "100%";
    document.body.style.backgroundSize = "cover";
    document.title = "Admin Section";
    // setIsAuthenticate(localStorage.getItem("isLoggedIn"));
  }, []);
  return (
    <>
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
          <div className="card-body">
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
                {errors.email && <p>{errors.email}</p>}
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
                {errors.password && <p>{errors.password}</p>}
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
