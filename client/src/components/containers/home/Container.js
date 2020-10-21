import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from 'antd';
import { Card, CardBody, Col, Row } from "reactstrap";
import OrderList from "./OrderList";
import { getOrders } from "../../../store/actions/order";
import { getDrivers } from "../../../store/actions/driver";
import { getCustomers } from "../../../store/actions/customer";

const styles = {
  content: {
    minWidth: "100%",
    minHeight: "98vh"
  },
  h5: {
    marginTop: "-5px"
  }
}


const HomeContainer = (props) => {
  const orders = useSelector((state) => state.orderReducer);
  const riders = useSelector((state) => state.riderReducer);
  const customers = useSelector((state) => state.customerReducer);
  const dispatch = useDispatch();
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);

  let completedOrderCosts = [];

  const onChangePage = (pageOfItems) => {
    // update state with new page of items
    setPageOfItems(pageOfItems);
  }

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getDrivers());
    dispatch(getCustomers());
  }, [ dispatch ]);

  useEffect(() => {

    if (orders.error && orders.error.length) {
      message.error(orders.error);
    } else if (orders.ordersSuccess === true) {
      setData(orders.orders);
    }
  }, [ orders ]);

  const completedOrders = data && data.length && data.filter(orders => orders.tripCompleted === true);
  if (completedOrders.length) {
    for (let i = 0; i < completedOrders.length; i++) {
      completedOrderCosts.push(completedOrders[i].cost);
    }
  }

  const totalEarned = completedOrderCosts.length && completedOrderCosts.reduce((a, b) => a + b, 0);
  const allRiders = riders.riders && riders.riders;
  const cancelledOrders = data && data.filter(order => order.cancelled === true);
  const activeRides = data && data.filter(order => order.on_going === true);
  const allCustomers = customers.customers && customers.customers;
  const completeRides = data && data.filter(data => data.tripCompleted === true);

  return (
    <div>
      <Row>
        <Col xs="12" xl="4" className="mt-3">
          <Card>
            <CardBody>
              <p>Total Earned</p>
              <h5 style={styles.h5}><strong>NGN{totalEarned.toFixed(2)}</strong></h5>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="4" className="mt-3">
          <Card>
            <CardBody>
              <p>Active orders</p>
              <h5 style={styles.h5}><strong>{activeRides && activeRides.length}</strong></h5>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="4" className="mt-3">
          <Card>
            <CardBody>
              <p>Complete orders</p>
                <h5 style={styles.h5}><strong>{completeRides && completeRides.length}</strong></h5>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" xl="7">
          <OrderList orders={orders} data={data} onChangePage={onChangePage} pageOfItems={pageOfItems} />
        </Col>
        <Col xs="12" xl="5">
          <Row>
            <Col xs="12" xl="6" className="mt-3">
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <p>Drivers</p>
                    <h5>{allRiders && allRiders.length}</h5>
                  </div>
                  <div>
                    <p>Customers</p>
                    <h5>{allCustomers && allCustomers.length}</h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" xl="6" className="mt-3">
            <Card>
              <CardBody>
                <p>Active rides</p>
                <h5>{activeRides && activeRides.length}</h5>
                <p>Cancelled rides</p>
                <h5>{cancelledOrders && cancelledOrders.length}</h5>
              </CardBody>
            </Card>
            </Col>
          </Row>
          <Row></Row>
        </Col>
      </Row>
    </div>
  )
}

export default HomeContainer;