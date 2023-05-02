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
    addUser
  } from "../Redux/manageSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useUserForm = (initialValues, id, localstrorage =false) => {  
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
    let formData = new FormData();
    for (const key in values) {
      if (key == "password") {
        formData.append(key, encryptVal(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    }
    id ?
    dispatch(updateUser({ id: id, values: formData }))
      .unwrap()
      .then((res) => {
        if (res.status === 1) {
          toast.success(res.message, {
            className: "toast-message",
          });
          if (localstrorage===true) {
            localStorage.setItem(
                "user",
                JSON.stringify({
                  data: JSON.stringify(res.data),
                })
              );
          }
        } else {
          toast.error(res.message, {
            className: "toast-message",
          });
        }
      })
      .catch((err) => {
        toast.error(`${err.message}`, {
          className: "toast-message",
        });
      })
      : dispatch(addUser({ values: formData }))
      .unwrap()
      .then((res) => {
        resetForm();
        if (res.status === 1) {
          dispatch(getUsersList({ type: "admin" }))
          toast.success(res.message, {
            className: "toast-message",
          });
        } else {
          toast.error(res.message, {
            className: "toast-message",
          });
        }
      })
      .catch((err) => {
        toast.error(`${err.message}`, {
          className: "toast-message",
        });
      })
  };
  const { values, errors, handleChange, setFieldValue, handleSubmit, resetForm } =
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
  };
};

export default useUserForm;
