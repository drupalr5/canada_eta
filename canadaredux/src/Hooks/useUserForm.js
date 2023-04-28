import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { encryptVal, decryptVal } from "../utility/utility";
import {
    getUserData,
    updateUser,
    uploadUserImage,
    getUsersList,
    deleteUserData,
    getUser,
  } from "../Redux/manageSlice";
import { useDispatch } from "react-redux";

const useUserForm = (initialValues, id, localstrorage =false) => {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const foundOrderSchema = yup.object({
    // orderId: yup.string().required("Please enter your Order Id"),
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
  const updateHandler = () => {
    // let formData = new FormData();
    // for (const key in values) {
    //   if (key == "password") {
    //     formData.append(key, encryptVal(values[key]));
    //   } else {
    //     formData.append(key, values[key]);
    //   }
    // }
    // // console.log(formData);
    // dispatch(uploadUserImage(formData))
    //   .unwrap()
    //   .then((response) => {})
    //   .catch((error) => {});
    const data = {
      name: values.name,
      email: values.email,
      password: encryptVal(values.password),
      type: values.type,
      profile_path: values.profile_path,
    };
    dispatch(updateUser({ id: id, values: data }))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.status === 1) {
          setMsg(res.message);
          setErr("");
          if (localstrorage===true) {
            localStorage.setItem(
                "user",
                JSON.stringify({
                  data: JSON.stringify(res.data),
                })
              );
          }
        } else {
          setMsg("");
          setErr(res.message);
        }
      });
  };
  const { values, errors, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      validationSchema: foundOrderSchema,
      onSubmit: updateHandler,
    });
  return {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    msg,
    err,
  };
};

export default useUserForm;
