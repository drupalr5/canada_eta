import React, { useState } from "react";
import PageHeading from "../Common/PageHeading";
import useForm from "../../Hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGatewayList } from "../../Redux/gatewaySlice";

function Settings(props) {
  // const [msg, setMsg] = useState("");
  // const [err, setErr] = useState("");
  const gateway = useSelector((state) => state?.gateway?.gateway);
  const [defaultOption, setDefaultOption] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGatewayList())
      .unwrap()
      .then((response) => {
        // setDefaultOption(response)
        response?.map((item) => {
          if (item.is_active === '1') {            
            setDefaultOption(item.id);
          }
        });
      })
      .catch((error) => {
        // console.log(error)
      });
  }, []);
  const submitHandler = (event) => {
    // event.preventDefault();
    console.log(values)
  //   dispatch(
  //     changePassword({
  //       userId: id,
  //       passwordParams: { password: encryptVal(values.password) },
  //     })
  //   )
  //     .unwrap()
  //     .then((res) => {
  //       if (res.status === 1) {
  //         setMsg(res.message);
  //         setErr('')
  //       } else {
  //         setErr(res.message);
  //         setMsg('')
  //       }
  //     });
  };
  const { handleChange, values, errors, handleSubmit } = useForm(submitHandler);
  // const test = gateway?.map((item) => {
  //   if(item.is_active === 1) { console.log(item); setDefaultOption(item.id) }})
  
  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="header">
              <PageHeading pagename={props.heading} />
            </div>
            <div className="body">
              <form onSubmit={handleSubmit}>
                <label htmlFor="gateway_name">
                  <strong>Gateway</strong>
                </label>
                <select
                  className="form-control gateway_name"
                  name="gateway_name"
                  style={{
                    height: "calc(3.25rem + 2px) !important",
                    height: "40px",
                  }}
                  defaultValue={defaultOption}
                  onChange={handleChange}
                >
                  <option value="">Select Gateway</option>
                  {gateway?.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <div className="col-sm-12">
                  <br />
                  <button className="btn btn-primary" type="submit">
                    Active Gateway
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
