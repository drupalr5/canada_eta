import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import TrackOrder from '../Components/TrackOrder/TrackOrder'
function Main(props) {
  return (
    <Routes>
      <Route path="/:order_id" element={<TrackOrder />}></Route>
    </Routes>
  )
}

export default Main;