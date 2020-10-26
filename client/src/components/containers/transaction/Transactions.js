import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Card, CardBody, Row, Table, Spinner } from "reactstrap";
import { Input, Tabs, message } from "antd";
import { getOrders, deleteOrder } from "../../../store/actions/order";
import Paginations from "../../views/Pagination";
import { EyeOutlined, DeleteOutlined, FilterOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const styles = {
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
    // padding: "7px",
    textAlign: "center"
  },
  delete: {
    color: "#ff0000",
    cursor: "pointer"
  },
  view: {
    color: "#26acd1",
    cursor: "pointer"
  },
  searchWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  filterIcon: {
    fontSize: "18px",
    background: "#26acd1",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    marginRight: "5px"
  }
}

const Transactions = (props) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer);
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    dispatch(getOrders());
  }, [ dispatch ]);

  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  }

  useEffect(() => {
    if (orders.error && orders.error.length) {
      message.error(orders.error);
    } else if (orders.ordersSuccess) {
      setData(orders.orders);
    }
  }, [ orders ]);

  const onView = (id) => {
    const { match } = props;
    props.history.push(`${match.url}/${id}`);
  }

  const onDelete = (id) => {
    dispatch(deleteOrder(id));
  }

  const operations = <div style={styles.searchWrapper}>
      <FilterOutlined style={styles.filterIcon} /> 
      <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>;

  const filterData = data.filter(orders => orders.senderId && orders.senderId.firstName && orders.senderId.firstName.toLowerCase().indexOf(search) !== -1 || orders.trxnId && orders.trxnId.toLowerCase().indexOf(search) !== -1);
  const completedOrders = data && data.length && data.filter(order => order.tripCompleted === true);
  const activeRide = data && data.length && data.filter(order => order.on_going === true);

  return (
    <div>
      <Row>
        <Col xs="12" xl="4">
          <Card>
            <CardBody>
              <p>Total orders</p>
              <h3>{orders.orders && orders.orders.length}</h3>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="4">
          <Card>
            <CardBody>
              <p>Active orders</p>
              <h3>{activeRide && activeRide.length}</h3>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" xl="4">
          <Card>
            <CardBody>
              <p>Completed orders</p>
              <h3>{completedOrders && completedOrders.length}</h3>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3 ustify-content-center">
        <Col xs="11" xl="12">
          <Tabs tabBarExtraContent={operations}>
            <TabPane tab={filterData && filterData.length + " Orders"} key="1">
              <Table responsive hover style={styles.table}>
                <thead>
                  <tr style={styles.thead}>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Driver</th>
                    <th style={styles.th}>Pick-up address</th>
                    <th style={styles.th}>Vehicle type</th>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>No. of stops</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>View</th>
                    <th style={styles.th}>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.ridersLoading ? <Spinner color="primary" /> : filterData && filterData.length ? filterData.map(order => (
                    <tr>
                      <td>{order.senderId && order.senderId.firstName} {order.senderId && order.senderId.lastName}</td>
                      <td>{order.riderId && order.riderId.firstName} {order.riderId && order.riderId.lastName}</td>
                      <td>{order.pickupLocation ? order.pickupLocation : "No pickup address"} </td>
                      <td>{order && order.vehicleType && order.vehicleType.charAt(0).toUpperCase() + order.vehicleType.slice(1)}</td>
                      <td>{order.trxnId}</td>
                      <td>{order.deliveryLocation && order.deliveryLocation.length}</td>
                      <td>{order.cost}</td>
                      <td style={{ color: order.on_going ? "blue" : order.tripCompleted ? "Green" : order.cancelled ? "red" : ""}}>{order.on_going ? "On going" : order.tripCompleted ? "Delivered" : order.cancelled ? "Cancelled" : "No rider"}</td>
                      <td onClick={() => onView(order._id)}>
                        <span style={styles.view}>
                          <EyeOutlined />
                        </span>
                      </td>
                      <td>
                        <span style={styles.delete} onClick={() => onDelete(order._id)}>
                          <DeleteOutlined />
                        </span>
                      </td>
                    </tr>
                  )) : pageOfItems && pageOfItems.length > 0 ? pageOfItems.map(order => (
                    <tr>
                      <td>{order.senderId && order.senderId.firstName} {order.senderId && order.senderId.lastName}</td>
                      <td>{order.riderId && order.riderId.firstName} {order.riderId && order.riderId.lastName}</td>
                      <td>{order.pickupLocation ? order.pickupLocation : "No pickup address"} </td>
                      <td>{order.vehicleType}</td>
                      <td>{order.trxnId}</td>
                      <td>{order.deliveryLocation && order.deliveryLocation.length}</td>
                      <td>{order.cost}</td>
                      <td style={{ color: order.on_going ? "blue" : order.tripCompleted ? "Green" : order.cancelled ? "red" : ""}}>{order.on_going ? "On going" : order.tripCompleted ? "Delivered" : order.cancelled ? "Cancelled" : "No rider"}</td>
                      <td onClick={() => onView(order._id)}>
                        <span style={styles.view}>
                          <EyeOutlined />
                        </span>
                      </td>
                      <td>
                        <span style={styles.delete} onClick={() => onDelete(order._id)}>
                          <DeleteOutlined />
                        </span>
                      </td>
                    </tr>
                  )) : <p>No records found</p>}
                </tbody>
              </Table>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      {filterData && filterData.length > 0 ? (
        <Paginations items={data && data} onChangePage={onChangePage} />
      ) : null}
      
    </div>
  );
}

export default Transactions;