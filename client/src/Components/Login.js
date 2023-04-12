import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../Allassets/vendor/bootstrap/css/bootstrap.min.css";
import "../Allassets/vendor/fontawesome-free/css/all.min.css";
import "../Allassets/assets/css/sb-css/sb-admin.css";
import useForm from '../Hooks/useForm';

function Login(props) {
  const navigate = useNavigate();  
  useEffect(() => {
    document.body.classList.remove("theme-black")
  }, []);
  const loginHnadler = () => {
    localStorage.setItem("isLoggedIn", "1");
    navigate('home/dashboard')
  };
  const {handleChange, values, errors, handleSubmit} = useForm(loginHnadler);
  useEffect(() => {
    document.body.style.backgroundImage= 'url("https://canada-eta.online/admin/assets/images/canada-bg-logo.png")';
    document.body.style.backgroundRepeat= 'no - repeat'
    document.body.style.backgroundAttachment= 'fixed';
    document.body.style.maxWidth= "100%";
    document.body.style.backgroundSize= 'cover';
    // setIsAuthenticate(localStorage.getItem("isLoggedIn"));
  },[])

  if(localStorage.getItem("isLoggedIn")) {
    navigate('home/dashboard')
  } else {
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
                    onChange={handleChange}
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                {
                  errors.email && <p>{errors.email}</p>
                }
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    name="password"
                    className="form-control"
                    required="required"
                    onChange={handleChange}
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                {
                  errors.password && <p>{errors.password}</p>
          
                }
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                href="index.html"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  }
}

export default Login;
