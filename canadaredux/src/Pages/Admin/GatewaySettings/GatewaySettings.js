import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../Common/PageHeader/PageHeader";
import { getGatewayList, updateGatewayData } from "../../../Redux/gatewaySlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { MainContainer, Card, CardHeader, CardBody } from '../../Common/style'
function GatewaySettings(props) {
  const gateway = useSelector((state) => state?.gateway?.gateway);
  const [defaultOption, setDefaultOption] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGatewayList())
      .unwrap()
      .then((response) => {
        response?.map((item) => {
          if (item.is_active === "1") {
            setDefaultOption(item.id);
          }
        });
      })
      .catch((error) => {
      });
  }, []);
  const submitHandler = () => {
    dispatch(updateGatewayData(values))
      .unwrap()
      .then((res) => {
        if (res.status === 1) {
          toast.success(res.message, {
            className: "toast-message",
          });
        } else {
          toast.error(res.message, {
            className: "toast-message",
          });
        }
      });
  };
  const gatewaySchema = yup.object({
    gateway_name: yup.string().required("Please select gateway name"),
  });
  let initialValues = {};
  if (defaultOption != null) {
    initialValues.gateway_name = defaultOption;
  } else {
    initialValues.gateway_name = "";
  }
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: gatewaySchema,
    onSubmit: submitHandler,
  });

  return (
      <MainContainer className="col-lg-12 col-md-12 col-sm-12">
        <Card className="card">
          <CardHeader className="header">
            <PageHeading pagename={props.heading} />
          </CardHeader>
          <CardBody className="body">
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
                value={values.gateway_name}
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
              <p style={{ color: "red" }}>{errors.gateway_name}</p>
              <div className="col-sm-12">
                <br />
                <button className="btn btn-primary" type="submit">
                  Active Gateway
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </MainContainer>
  );
}

export default GatewaySettings;
