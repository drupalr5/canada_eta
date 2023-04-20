import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Allassets/vendor/bootstrap/css/bootstrap.min.css";
import "../../Allassets/vendor/fontawesome-free/css/all.min.css";
import "../../Allassets/assets/css/sb-css/sb-admin.css";
import backgroundImage from "../../Allassets/assets/images/canada-bg-logo.png";
import useForm from "../../Hooks/useForm";
import { useDispatch } from "react-redux";
import { authenticate } from "../../Redux/authSlice";
import { encryptVal } from "../../utility/utility";

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
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
    dispatch(authenticate({email: (values.email), password: encryptVal(values.password)}))
      .unwrap()
      .then((res) => {
        if (res.status === 1) {
          if (res.data.type === "Admin") {
            navigate("/admin");
          } else if (res.data.type === "Team") {
            navigate("/team");
          } else if (res.data.type === "Night Staff") {
            navigate("/night_staff");
          }
          setErr('')
        } else {
          setErr(res.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { handleChange, values, errors, handleSubmit } = useForm(loginHnadler);
  return (
    <>
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
          <div className="card-body">
            <form onSubmit={handleSubmit} method="post">
            <p style={{color: 'red'}}>{err && err}</p>
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
                <p style={{color: 'red'}}>{errors.email && errors.email}</p>
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
                <p style={{color: 'red'}}>{errors.password && errors.password}</p>
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
