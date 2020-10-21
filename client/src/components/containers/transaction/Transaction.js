import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Card, CardBody, Table } from "reactstrap";
import { getOrder } from "../../../store/actions/order";
import Avatar from "../../../assets/user_avatar.jpg"
import Car from "../../../assets/car.png";
import MapWrapper from "../../views/MapWrapper";
import { getLatLng } from "../../../store/actions/calculator";
import { ArrowLeftOutlined } from "@ant-design/icons";

const styles = {
  p: {
    lineHeight: 0.1
  },
  image: {
    width: "40px",
    height: "40px"
  },
  imageContainer: {
    borderRadius: "100%",
    width: "35px",
    height: "auto",
    backgroundColor: "#F2F2F2",
    paddingLeft: "13px",
    paddingTop: "8px",
    paddingBottom: "5px"
  },
  table: {
    borderTop: 0,
    borderTopWidth: 0,
    borderTopStyle: "none",
    borderTopColor: "",
    borderBottom: 0,
    borderBottomWidth: 0,
    borderBottomStyle: "none",
    borderBottomColor: "",
    fontSize: 11,
    padding: "2px"
  },
  backArrow: {
    marginBottom: "10px",
    border: "1px solid #333",
    borderRadius: "50%",
    padding: "10px"
  },
}

const BASE_URL = process.env.REACT_APP_API_URL;

const Transaction = (props) => {
  const [ pickupLat, setPickupLat ] = useState("");
  const [ pickupLong, setPickupLng ] = useState("");
  const [ destLatitude, setDestLat ] = useState("");
  const [ destLongitude, setDestLong ] = useState("");
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderReducer);
  const coordinates = useSelector((state) => state.priceReducer.results.results);
  const orderId = window.location.pathname.slice(24, 48);
  const orderDetail = order.order && order.order;

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [ dispatch ]);

  useEffect(() => {
    setPickupLat(orderDetail && orderDetail.pickupLat);
    setPickupLng(orderDetail && orderDetail.pickupLong);
  }, [ order.order ]);

  useEffect(() => {
    if (order.orderSuccess) {
      const lastAddress = order.order && order.order.deliveryLocation && order.order.deliveryLocation[0];
      if (lastAddress && lastAddress.address && lastAddress.address.length > 0) {
        dispatch(getLatLng(lastAddress.address));
      }
    }
  }, [ order, dispatch ]);

  useEffect(() => {
    const destLatitude = coordinates && coordinates[0] && coordinates[0].geometry && coordinates[0].geometry.location && coordinates[0].geometry.location.lat;
    const destLongitude = coordinates && coordinates[0] && coordinates[0].geometry && coordinates[0].geometry.location && coordinates[0].geometry.location.lng;
    
    setDestLat(destLatitude);
    setDestLong(destLongitude);
  }, [ coordinates ]);

  const data = [
    {
      lat: pickupLat,
      lng: pickupLong
    },
    {
      lat: destLatitude,
      lng: destLongitude
    },
  ];

  return (
    <div>
      <Row>
        <Col xs="12" xl="6">
          <ArrowLeftOutlined style={styles.backArrow} onClick={() => props.history.goBack()} />
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs="12" xl="12">
          <Card>
            <MapWrapper places={data} defaultCenter={{ lat: 6.465422, lng: 3.406448 }} defaultZoom={14} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl="3" xs="12">
          <Row>
            <Col xs="3" xl="3">
              <img style={styles.image} src={`${BASE_URL}/photo/${orderDetail.senderId && orderDetail.senderId.role}/${orderDetail && orderDetail._id}`}
                onError={i => i.target.src=`${Avatar}`}
                alt="customer"
              />
            </Col>
            <Col xs="9" xl="9">
              <p><strong>{orderDetail.senderId && orderDetail.senderId.firstName} {orderDetail.senderId && orderDetail.senderId.lastName}</strong></p>
              <p style={styles.p}>{orderDetail.senderId && orderDetail.senderId.role}</p>
            </Col>
          </Row>
        </Col>
        <Col xl="3" xs="12">
          <Row>
            <Col xs="3" xl="3">
              <img style={styles.image} src={`${BASE_URL}/photo/${orderDetail.riderId && orderDetail.riderId.role}/${orderDetail && orderDetail._id}`}
                onError={i => i.target.src=`${Avatar}`}
                alt="customer"
              />
            </Col>
            <Col xs="9" xl="9">
              <p><strong>
                {orderDetail.riderId && orderDetail.riderId.firstName} {orderDetail.riderId && orderDetail.riderId.lastName}</strong>
              </p>
              <p  style={styles.p}>{orderDetail.riderId && orderDetail.riderId.role && orderDetail.riderId.role.charAt(0).toUpperCase() + orderDetail.riderId.role.slice(1)}</p>
            </Col>
          </Row>
        </Col>
        <Col xl="3" xs="12">
          <Row>
            <Col xs="3" xl="3">
                <div style={styles.imageContainer}>
                  <img style={{ width: "10px", height: "20px", }} src={Car}
                  alt="customer"
                  />
                </div>
              
            </Col>
            <Col xs="9" xl="9">
              <p><strong>
                {orderDetail.riderId && orderDetail.riderId.vehicleNumber} </strong>
              </p>
              <p  style={styles.p}>{orderDetail.riderId && orderDetail.riderId.vehicleModel}</p>
            </Col>
          </Row>
        </Col>
        <Col xl="3" xs="12"></Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" xl="3" className="mt-1">
          <Card className="pb-4">
            <CardBody>
              <p><strong>Pick-up address</strong></p>
              <p>{orderDetail && orderDetail.pickupLocation}</p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="3" className="mt-1">
          <Card className="pb-4">
            <CardBody>
              <p><strong>Package description</strong></p>
              <p>{orderDetail && orderDetail.packageDescription}</p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="3" className="mt-1">
          <Card className="pb-4">
            <CardBody>
              <p><strong>Feed backs</strong></p>
              <p>{orderDetail && orderDetail.pickupLocation}</p>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="3" className="mt-1">
          <Card>
            <CardBody>
              <Table style={{ border: "none"}}>
                <thead style={styles.table}>
                  <tr style={styles.table}>
                    <th style={styles.table}>Date</th>
                    <th style={styles.table}>{orderDetail.createdAt && moment(orderDetail.createdAt).format("DD/MM/YYY")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.table}>Time Started</td>
                    <td style={styles.table}></td>
                  </tr>
                  <tr>
                    <td style={styles.table}>Time completed</td>
                    <td style={styles.table}></td>
                  </tr>
                  <tr>
                    <td style={styles.table}>Status</td>
                    <td style={{ color: order.on_going ? "blue" : order.tripCompleted ? "Green" : orderDetail.cancelled ? "red" : "", ...styles.table}}>{orderDetail.on_going ? "On going" : orderDetail.tripCompleted ? "Delivered" : orderDetail.cancelled ? "Cancelled" : "No rider"}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Transaction;