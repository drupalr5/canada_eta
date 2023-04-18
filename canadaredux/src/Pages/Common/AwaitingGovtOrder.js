import React, { useState, useEffect } from "react";
import OrderRender from "./OrderRender";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList } from "../../Redux/orderSlice";
function AwaitingGovtOrder(props) {
  const [orderList, setOrderList] = useState([]);
  const dispatch = useDispatch();
  let loginUser = JSON.parse(localStorage.getItem("user"));
  let utype = loginUser.type ? loginUser.type : null;
  if (utype && utype != "Team") {
    utype = null
  }
  useEffect(() => {
    let param = {
      payment_status: 'Success',
      process_status: 'AwaitingGovt',
      assign_to: utype
    }
    dispatch(getOrdersList(param))
      .unwrap()
      .then((res) => {
        setOrderList(res?.data)
      });
  }, [dispatch])

  return (
    <>
      <OrderRender heading={props.heading} tableHeading="" orders={orderList} />
    </>
  );
}

export default AwaitingGovtOrder;
