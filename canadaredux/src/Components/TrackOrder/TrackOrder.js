import React from "react";
import { useParams } from "react-router-dom";
import { SectionStyled } from '../../FrontLayout/style'
function TrackOrder() {
  const { order_id } = useParams();
  const decodeId = atob(order_id);
  return (
    <SectionStyled className="contact" id="contact">
      <div className="container"></div>
      <div className="container">
        <div className="col-lg-12 mt-12 mt-lg-12">
          <h2>To download your eTA from our portal you will need to enter the email address you used when you completed your transactions.</h2>
          <form>
            <div className="input-group">
              <label>Order Id</label>
              <input type="text" name="order_id" value={decodeId}/>
            </div>
            <div className="input-group">
              <label>Email Id</label>
              <input type="email" name="email" />
            </div>
            <button type="submit">Download eTA</button>
          </form>
        </div>
      </div >
    </SectionStyled >
  )
}

export default TrackOrder