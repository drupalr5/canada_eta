import React, { useEffect } from "react";
import NewOrderImage from "../../../Allassets/assets/images/new_order.svg";
import PendingOrderImage from "../../../Allassets/assets/images/pending_order.svg";
import CompletedOrderImage from "../../../Allassets/assets/images/completed_order.svg";
import ContactOrderImage from "../../../Allassets/assets/images/contact_customer.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getOrderTiles } from "../../../Redux/orderSlice";
import useAuthParameter from "../../../Hooks/useAuthParameter";
import { MainFolder, StyledCard} from './style'
import { Card, CardBody } from '../../../Pages/Common/style'
function NavBar() {
  const tiles = useSelector(state => state?.order?.tilesCount)
  const dispatch = useDispatch();
  const { param, path } = useAuthParameter();
  useEffect(() => {
    dispatch(getOrderTiles(param))
      .then(response => {
        // setTiles(response?.payload)
      })
      .catch((error) => {
        alert({ error });
      });
  }, [dispatch])
  return (
    <MainFolder>
      <StyledCard>
        <Card className="card text-center">
          <Link to={`${path}/`} >
            <CardBody className="body">
              <p className="m-b-20">
                <img src={NewOrderImage} alt="Order Logo" />
              </p>
              <span>New Orders</span>
              <h3
                className="m-b-10"
                data-from="0"
                data-to={tiles?.new_order}
                dataspeed="2000"
                data-fresh-interval="700"
              >
                {tiles?.new_order}
              </h3>
            </CardBody>
          </Link>
        </Card>
      </StyledCard>
      <StyledCard>
        <Card className="card text-center">
          <Link to={`${path}/priority-order`} >
            <CardBody className="body">
              <p className="m-b-20">
                <img src={PendingOrderImage} alt="Priority Orders" />
              </p>
              <span>Priority Orders</span>
              <h3
                className="m-b-10 number count-to"
                data-from="0"
                data-to={tiles?.priority_order}
                data-speed="2000"
                data-fresh-interval="700"
              >
                {tiles?.priority_order}
              </h3>
            </CardBody>
          </Link>
        </Card>
      </StyledCard>

      <StyledCard>
        <Card className="card text-center">
          <Link to={`${path}/pending-order`} >
            <CardBody className="body">
              <p className="m-b-20">
                <img src={PendingOrderImage} alt="Pending Orders" />
              </p>
              <span>Pending Orders</span>
              <h3
                className="m-b-10 number count-to"
                data-from="0"
                data-to={tiles?.pending_order}
                data-speed="2000"
                data-fresh-interval="700"
              >
                {tiles?.pending_order}
              </h3>
            </CardBody>
          </Link>
        </Card>
      </StyledCard>
      <StyledCard>
        <Card className="card text-center">
          <Link to={`${path}/completed-order`}>
            <CardBody className="body">
              <p className="m-b-20">
                <img src={CompletedOrderImage} alt="Completed Order" />
              </p>
              <span>Completed Orders</span>
              <h3
                className="m-b-10 number count-to"
                data-from="0"
                data-to={tiles?.complete_order}
                data-speed="2000"
                data-fresh-interval="700"
              >
                {tiles?.complete_order}
              </h3>
            </CardBody>
          </Link>
        </Card>
      </StyledCard>
      <StyledCard>
        <Card className="card text-center">
          <Link to={`${path}/contact-customer`}>
            <CardBody className="body">
              <p className="m-b-20">
                <img src={ContactOrderImage} alt="Contact Order" />
              </p>
              <span>Contact Customer</span>
              <h3
                className="m-b-10 number count-to"
                data-from="0"
                data-to="70"
                data-speed="2000"
                data-fresh-interval="700"
              >
                {tiles?.customer_contact}
              </h3>
            </CardBody>
          </Link>
        </Card>
      </StyledCard>
      <div className="overlay"></div>
    </MainFolder>
  );
}

export default NavBar;
