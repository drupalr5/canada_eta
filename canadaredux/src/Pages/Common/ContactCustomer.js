import React, { useState, useEffect } from "react";
import PageHeading from "./PageHeading";
import DTable from "./DTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersList, deleteOrdersData, getOrderSideBarCount, getOrderTiles } from "../../Redux/orderSlice";
import useOrderListHook from "../../Hooks/useOrderListHook";
import useAuthParameter from "../../Hooks/useAuthParameter";
function ContactCustomer(props) {
  const dispatch = useDispatch();
  const orderList = useSelector(state => state.order.orderData);
  const { user, utype, name, path, param } = useAuthParameter();
  let orderParam = {
    payment_status: 'Success',
    process_status: 'Contact Customer',
    assign_to: utype
  }
  useEffect(() => {
    dispatch(getOrdersList(orderParam))
      .unwrap()
      .then((res) => {
      });
  }, [dispatch])

  const deleteOrderHandler = (e) => {
    e.preventDefault();
    const oid = e.target.attributes.oid.nodeValue;
    const deleteOrder = window.confirm(`Are you sure you want to delete this order? ${oid}`);
    if (deleteOrder) {
      let updateData = {
        process_status: "Deleted"
      }
      dispatch(deleteOrdersData({ order_id: oid, data: updateData }))
        .unwrap()
        .then((res) => {
          dispatch(getOrderTiles(param))
          dispatch(getOrderSideBarCount(param))
          dispatch(getOrdersList(orderParam))
        })
        .catch()
    }
  }

  const ReactDataTable = useOrderListHook(orderList, [], deleteOrderHandler)

  return (
    <>
      <DTable orders={ReactDataTable?.result} columns={ReactDataTable?.columns} teamMemeber={false}>
        <PageHeading pagename={props.heading} />
      </DTable>
    </>
  );
}

export default ContactCustomer;
