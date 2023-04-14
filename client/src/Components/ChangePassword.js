import React, { useState } from "react";
import PageHeading from "./PageHeading";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ChangePassword(props) {
  const [pssword, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setError] = useState("");
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const updatePassword = (event) => {
    event.preventDefault();
    let loginUser = JSON.parse(localStorage.getItem("user"));
    let id = loginUser.id;
    axios
      .put(`http://localhost:3001/api/admin/update/${id}`, {
        params: { password: pssword },
      })
      .then((response) => {        
        if (response.data.message === "Success...") {
          setMsg('Password updated succusessfully')
          console.log(msg)
          alert('Password updated succusessfully')
        }else {
          setError(response.data.message)
        }
      })
      .catch((error) => {
        setError(error)
      });
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
              
              <Form onSubmit={updatePassword}>
      
              <p>{ msg && msg }{ err && err }</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        value={pssword}
        onChange={passwordHandler}/>
      </Form.Group>
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
