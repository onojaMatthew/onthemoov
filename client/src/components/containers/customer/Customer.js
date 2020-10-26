import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Table, Spinner } from "reactstrap";
import Avatar from "../../../assets/user_avatar.jpg";
import { getOrders } from "../../../store/actions/order";
import { getCustomer } from "../../../store/actions/customer";
import Paginations from "../../views/Pagination";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BASE_URL = process.env.REACT_APP_API_URL;

const styles = {
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%"
  },
  p: {
    lineHeight: 0.7,
    fontSize: "12px"
  },
  button: {
    float: "right",
    backgroundColor: "#26acd1",
    color: "#fff"
  },
  h5: {
    marginTop: "-5px"
  },
  table: {
    fontSize: 12,
    background: "#fff",
  },
  thead: {
    background: "#26ACD144",
  },
  th: {
    textAlign: "center"
  },
  row: {
    textAlign: "center"
  },
  ifram: {
    width: "100%",
    height: "auto"
  },
  backArrow: {
    marginBottom: "10px",
    border: "1px solid #333",
    borderRadius: "50%",
    padding: "10px"
  },
  spinner: {
    color: "#26acd1"
  }
}

const Customer = (props) => {
  const [ data, setData ] = useState([]);
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customerReducer);
  const orders = useSelector((state) => state.orderReducer);
  const customerId = window.location.pathname.slice(21, 45);
  
  useEffect(() => {
    dispatch(getCustomer(customerId));
    dispatch(getOrders());
  }, [ dispatch, customerId ]);

  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems)
  }
  
  const customerDetails = customer.customers[0] && customer.customers[0]
  const filteredOrders = orders && orders.orders && orders.orders.filter(order => order.senderId && order.senderId._id === customerId);

  useEffect(() => {
    setData(filteredOrders);
  }, [filteredOrders]);
 
  return (
    <div>
      <Row>
        <Col xs="12" xl="6">
          <ArrowLeftOutlined style={styles.backArrow} onClick={() => props.history.goBack()} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" xl="2">
          <img 
            src={`${BASE_URL}/photo/${customerDetails && customerDetails.role}/${customerDetails && customerDetails._id}?${new Date().getTime()}`}
            onError={(i) => i.target.src = `${Avatar}`}
            alt="avatar"
            style={styles.image}
          />
        </Col>
        <Col xs="12" xl="10">
          <h6><strong>{customerDetails && customerDetails.firstName} {customerDetails && customerDetails.lastName}</strong></h6>
          <Row className="mt-3">
            <Col xs="6" xl="2">
              <p style={styles.p}>Email address:</p>
              <p style={styles.p}>Phone</p>
            </Col>
            <Col xs="6" xl="6">
              <p style={styles.p}>{customerDetails && customerDetails.email}</p>
              <p style={styles.p}>{customerDetails && customerDetails.phone}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row className="mt-4">
        <Col xs="12" xl="12">
          <Table responsive bordered style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Rider</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Pickup address</th>
                <th style={styles.th}>No. of stops</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Toll fee</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.riderOrderLoading ? <Spinner style={styles.spinner} /> : filteredOrders && filteredOrders.length ? filteredOrders.map(order => (
                <tr key={order._id}>
                  <td style={styles.row}>{order.createdAt && moment(order.createdAt).format("DD/MM/YY")}</td>
                  <td style={styles.row}>{order.senderId && order.senderId.firstName}</td>
                  <td style={styles.row}>{order.senderId && order.senderId.phone}</td>
                  <td style={styles.row}>{order.senderId && order.senderId.email}</td>
                  <td style={styles.row}>319, Ligale</td>
                  <td style={styles.row}>{order.deliveryLocation && order.deliveryLocation.length}</td>
                  <td style={styles.row}>&#8358; {order.cost && order.cost.toFixed(2)}</td>
                  <td style={styles.row}>&#8358; {order.toll && order.toll.charge.toFixed(2)}</td>
                  <td style={styles.row}>{order.tripCompleted ? "Delivered" : order.on_going ? "On going" : "Cancelled"}</td>
                </tr>
              )) : <p>No records found</p>}
              
            </tbody>
          </Table>
        </Col>
      </Row>
      {data && data.length > 0 ? (
        <Paginations items={data} onChangePage={onChangePage} />
      ) : null}
    </div>
  );
}

export default Customer;