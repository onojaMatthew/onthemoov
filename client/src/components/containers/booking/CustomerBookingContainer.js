import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Container } from "reactstrap";
import { Layout } from "antd";
import CustomerBooking from "./CustomerBooking";
import CustomerOrders from "../transaction/CustomerOrders";
import Logo from "../../../assets/mlogo.jpeg";
import { LogoutOutlined } from "@ant-design/icons";
import Auth from "../../../helper/Auth";
import MapContextProver from "../../../context/MapContext";


const { Header, Footer } = Layout;
const styles = {
  pickupBorder: {
    borderBottom: "thin solid rgb(204, 204, 204)",
    marginBottom: ""
  },
  headers: {
    color: "#26ACD1"
  },
  button: {
    width: "40%",
    background: "#26ACD1",
    borderRadius: "5px",
    color: "#fff",
    float: "right",
  },
  amount: {
    // background: "#26ad1",
    padding: "10px"
  },
  moreAddr: {
    color: "#26ACD1",
    cursor: "pointer"
  },
  spinner: {
    color: "#26ACD1"
  },
  orderButton: {
    borderRadius: "20px",
    background: "#26ACD1",
    float: "right",
    width: "100%",
    marginBottom: "15px",
    marginTop: "15px",
    color: "#fff",
    height: "40px"
  },
  cardHeader: {
    backgroundColor: "none"
  },
  flex: {
    display: "flex",
    fontWeight: "bold"
  },
  placeSearch: {
    width: "100%",
  },
  header: {
    cursor: "pointer"
  }
}

const CustomerBookingCustomer = (props) => {
  
  const onCustomerBooking = () => {
    window.location.href = "/customer_booking";
  }

  const onHistory = () => {
    window.location.href = "/customer_booking/request_history";
  }

  const onLogout = () => {
    Auth.deauthenticateUser();
    window.location.href = "/signin";
  }

  return (
    <div>
      <Header theme="light" className="site-layout-background" style={{ padding: 0, marginBottom: "15px" }}>
        <Container>
          <div style={styles.flex}>
            <Link to={`${props.match.url}`}>
              <img src={Logo} className="logo-ima" alt="" />
            </Link>
            <p style={styles.header} onClick={() => onCustomerBooking()} className="tab-1">Request</p>
            <p style={styles.header} className="tab-2" onClick={() => onHistory()}>History</p>
            <p className="logout" onClick={() => onLogout()}>
              <LogoutOutlined /> <span className="logout-text">Logout</span>
            </p>
          </div>
        </Container>
      </Header>
      <Container>
        <Switch>
          <MapContextProver>
            <Route exact path={`${props.match.url}`} render={(props) => <CustomerBooking {...props} />} />
          </MapContextProver>
          <Route path={`${props.match.url}/request_history`} render={(props) => <CustomerOrders {...props} />} />
        </Switch>
      </Container>
      <Footer style={{ textAlign: 'right' }}>OnTheMoov&copy; {new Date().getFullYear()} Making Delivery Easy.</Footer>
    </div>
  );
}

export default CustomerBookingCustomer;