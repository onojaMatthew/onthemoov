import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Card, CardBody, Table, Spinner } from "reactstrap";
import { getDriver } from "../../../store/actions/driver";
import Avatar from "../../../assets/user_avatar.jpg";
import { Button, Modal } from "antd";
import { FilePdfOutlined } from "@ant-design/icons"
import { riderOrders } from "../../../store/actions/order";
import { getEarnings } from "../../../store/actions/earning";

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
  spinner: {
    color: "#26acd1"
  }
}

const RiderDetails = () => {
  const [ visible, setVisible ] = useState(false);
  const dispatch = useDispatch();
  const rider = useSelector((state) => state.riderReducer);
  const orders = useSelector((state) => state.orderReducer);
  const earnings = useSelector((state) => state.earningReducer);
  const riderId = window.location.pathname.slice(18, 42);
  
  useEffect(() => {
    dispatch(getDriver(riderId));
    dispatch(riderOrders(riderId));
    dispatch(getEarnings());
  }, [ dispatch, riderId ]);

  const riderDetails = rider.rider && rider.rider[0];
  const filteredOrders = orders && orders.orders && orders.orders.filter(order => order.riderId && order.riderId._id === riderId)
 
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const allEarings = earnings.earnings && earnings.earnings.filter(earning => earning.riderId && earning.riderId._id === riderId);
  let amountArr = [];
  let currentMnthAmt = [];
  let currentMnth = moment(new Date());
  for (let i = 0; i < allEarings.length; i++) {
    amountArr.push(allEarings[i].amount);
    let m = moment(allEarings[i].createdAt);
      
    if (m.month() === currentMnth.month() && m.year() === currentMnth.year()) {
      currentMnthAmt.push(allEarings[i].amount);
    }
  }

  const totalAmount = amountArr.reduce((a,b) => a + b, 0);
  const mnthTotal = currentMnthAmt.reduce((a, b) => a + b, 0);

  return (
    <div>
      <Row className="mt-4">
        <Col xs="12" xl="2">
          <img 
            src={`${BASE_URL}/photo/${riderDetails && riderDetails.role}/${riderDetails && riderDetails._id}?${new Date().getTime()}`}
            onError={(i) => i.target.src = `${Avatar}`}
            alt="avatar"
            style={styles.image}
          />
        </Col>
        <Col xs="12" xl="10">
          <h6><strong>{riderDetails && riderDetails.firstName} {riderDetails && riderDetails.lastName}</strong></h6>
          <Row className="mt-3">
            <Col xs="6" xl="2">
              <p style={styles.p}>Email address:</p>
              <p style={styles.p}>Phone</p>
              <p style={styles.p}>Status</p>
              <p style={styles.p}>Online</p>
              <p style={styles.p}>Available</p>
              <p style={styles.p}>Vehicle type:</p>
              <p style={styles.p}>Reg. number:</p>
              <p style={styles.p}>Model</p>
            </Col>
            <Col xs="6" xl="6">
              <p style={styles.p}>{riderDetails && riderDetails.email}</p>
              <p style={styles.p}>{riderDetails && riderDetails.phone}</p>
              <p style={styles.p}>
                {riderDetails && riderDetails.activated ? "Active" : "Inactive"}
              </p>
              <p style={styles.p}>{riderDetails && riderDetails.online ? "True" : "False"}</p>
              <p style={styles.p}>{riderDetails && riderDetails.available ? "Available" : "Not available"}</p>
              <p style={styles.p}>{riderDetails && riderDetails.vehicleType && riderDetails.vehicleType.charAt(0).toUpperCase() + riderDetails.vehicleType.slice(1)}</p>
              <p style={styles.p}>{riderDetails && riderDetails.vehicleNumber ? riderDetails.vehicleNumber : "Pending update"}</p>
              <p style={styles.p}>{riderDetails && riderDetails.vehicleModel ? riderDetails.vehicleModel : "Pending update"}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="12" xl="12">
          <Button 
            style={styles.button} 
            icon={<FilePdfOutlined />}
            onClick={() => setVisible(true)}
          > See documents</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" xl="3">
          <Card>
            <CardBody>
              <p>Total Earned</p>
              <h5 style={styles.h5}><strong>&#8358; {totalAmount && totalAmount + ".00"}</strong></h5>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="3">
          <Card>
            <CardBody>
              <p>Current month earnings</p>
              <h5 style={styles.h5}><strong>&#8358; {mnthTotal && mnthTotal + ".00"}</strong></h5>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="3">
          <Card>
            <CardBody>
              <p>Total rides</p>
              <h5 style={styles.h5}><strong>{filteredOrders && filteredOrders.length}</strong></h5>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="3">
          <Card>
            <CardBody>
              <p>Current month rides</p>
              <h5 style={styles.h5}><strong>{currentMnthAmt && currentMnthAmt.length}</strong></h5>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" xl="12">
          <Table responsive bordered style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Customer</th>
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
      <Row className="justify-content-center">
        <Col xs="12" xl="6">
          <Modal
            title="Rider's vehicle particulers"
            visible={visible}
            onOk={handleOk}
            onCancel={() => handleCancel()}
          >
            <Row className="mt-3">
              <Col xs="12" xl="12">
                <img src={`${BASE_URL}/rider/insurance/photo/${riderDetails && riderDetails._id}?${new Date().getTime()}`} style={ styles.ifram } alt="driver license" /> 
              </Col>
            </Row>
            <p>Vehicle insurance</p>
            <hr />
            <Row className="mt-3">
              <Col xs="12" xl="12">
                <img src={`${BASE_URL}/rider/license/photo/${riderDetails && riderDetails._id}?${new Date().getTime()}`} style={ styles.ifram } alt="driver license" /> 
              </Col>
            </Row>
            <p>Driving license</p>
            <hr />
            <Row className="mt-3">
              <Col xs="12" xl="12">
                <img src={`${BASE_URL}/rider/vehicle/photo/${riderDetails && riderDetails._id}?${new Date().getTime()}`} style={ styles.ifram } alt="driver license" /> 
              </Col>
            </Row>
            <p>Vehicle image</p>
          </Modal>
        </Col>
      </Row>
    </div>
  );
}

export default RiderDetails;