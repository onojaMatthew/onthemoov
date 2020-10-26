import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import HomeContainer from "./home/Container";
import { Col, Row } from "reactstrap";
import Transaction from "./transaction/Transaction";
import CustomersRiders from "./customer/Customers&Riders";
import NewRiders from "./driver/NewRiders";
import Settings from "./settings/Settings";
import Notifications from "./notification/Notifactions";
import Driver from "./driver/Driver";
import Customer from "./customer/Customer";
import RiderDetails from "./driver/RiderDetails";
import NotificationList from "./notification/NotificationList";
import Transactions from "./transaction/Transactions";
import Book from "./booking/Book";
import PendingCustomerOrders from "./transaction/PendingCustomerOrders";

const { Content } = Layout;

const Container = (props) => {
  const url = window.location.pathname;
  const param = url.slice(24, 49);

  return (
    <Content style={{ margin: '0 16px', minHeight: 500 }}>
      <div 
        className="site-layout-background" style={{ 
        padding: 24,
        minHeight: "92vh",
        backgroundColor: "#fff" 
        }}
      >
        {
          param && param.length === 24 ? null : 
          (
            <Row>
              <Col xs="12" xl="12">
                <div className="home-banner">
                  <h5>ONTHEMOOV App</h5>
                  <p className="banner-text">Manage Orders, Drivers and Activity</p>
                </div>
              </Col>
            </Row>
          )
        }
        
        <Switch>
          <Route exact path={`${props.match.url}`} render={(props) => <HomeContainer {...props} />} />
          <Route exact path={`${props.match.url}/booking`} render={(props) => <Book {...props} />} />
          <Route exact path={`${props.match.url}/customers`} render={(props) => <CustomersRiders {...props} />} />
          <Route exact path={`${props.match.url}/riders`} render={(props) => <Driver {...props} />} />
          <Route exact path={`${props.match.url}/riders/:riderId`} render={(props) => <RiderDetails {...props} />} />
          <Route exact path={`${props.match.url}/transactions`} render={(props) => <Transactions {...props} />} />
          <Route exact path={`${props.match.url}/transactions/:transactionId`} render={(props) => <Transaction {...props} />} />
          <Route exact path={`${props.match.url}/customers/:customerId`} render={(props) => <Customer {...props} />} />
          <Route exact path={`${props.match.url}/new_riders`} render={(props) => <NewRiders {...props} />} />
          <Route exact path={`${props.match.url}/notifications`} render={(props) => <NotificationList {...props} />} />
          <Route exact path={`${props.match.url}/notifications/:notificationId`} render={(props) => <Notifications {...props} />} />
          <Route exact path={`${props.match.url}/settings`} render={(props) => <Settings {...props} />} />
          <Route exact path={`${props.match.url}/pending_customer_orders`} render={(props) => <PendingCustomerOrders {...props} />} />
        </Switch>
      </div>
    </Content>
  );
}

export default Container;