import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Spinner, Card, CardBody } from "reactstrap";
import { Input, Tabs, message } from "antd";
import { getOrders, deleteOrder } from "../../../store/actions/order";
import Paginations from "../../views/Pagination";
import { DeleteOutlined, FilterOutlined } from "@ant-design/icons";
import { localAuth } from "../../../helper/authentcate";

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

const CustomerOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer);
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);
  const [ search, setSearch ] = useState("");

  const customerId = localAuth().user && localAuth().user._id;
  const role = localAuth().user && localAuth().user.role;

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
      const allOrders = orders.orders && orders.orders;
      const customerOrders = allOrders.filter(orders => orders.senderId && orders.senderId._id === customerId)
      setData(customerOrders);
    }
  }, [ orders ]);

  const onDelete = (id) => {
    dispatch(deleteOrder(id));
  }

  const operations = <div style={styles.searchWrapper}>
      <FilterOutlined style={styles.filterIcon} /> 
      <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>;

  const filterData = data.filter(orders => orders.senderId && orders.senderId.firstName && orders.senderId.firstName.toLowerCase().indexOf(search) !== -1 || orders.trxnId && orders.trxnId.toLowerCase().indexOf(search) !== -1);

  return (
    <div>
      <Card style={{ minHeight: "80vh"}}>
        <CardBody>
          <Row className="mt-3 ustify-content-center">
            <Col xs="11" xl="12">
              <Tabs tabBarExtraContent={operations}>
                <TabPane tab={data && data.length + " Orders"} key="1">
                  <Table responsive hover>
                    <thead>
                      <tr style={styles.thead}>
                        <th style={styles.th}>Customer</th>
                        <th>Pick-up address</th>
                        <th>Vehicle type</th>
                        <th>Order ID</th>
                        <th>No. of stops</th>
                        <th>Amount</th>
                        <th>Status</th>
                        {role === "admin" ? <th style={styles.th}>actions</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.ridersLoading ? <Spinner color="primary" /> : filterData && filterData.length ? filterData.map(order => (
                        <tr key={order._id}>
                          <td>{order.senderId && order.senderId.firstName} {order.senderId && order.senderId.lastName}</td>
                          <td>{order.pickupLocation} </td>
                          <td>{order.vehicleType && order.vehicleType.charAt(0).toUpperCase() + order.vehicleType.slice(1)}</td>
                          <td>{order.trxnId}</td>
                          <td>{order.deliveryLocation && order.deliveryLocation.length}</td>
                          <td>{order.cost}</td>
                          <td style={{ color: order.on_going ? "blue" : order.tripCompleted ? "Green" : order.cancelled ? "red" : ""}}>{order.on_going ? "On going" : order.tripCompleted ? "Delivered" : order.cancelled ? "Cancelled" : "Requested"}</td>
                          {role === "admin" ? <td>
                            <span style={styles.delete} onClick={() => onDelete(order._id)}>
                              <DeleteOutlined /> Delete
                            </span>
                          </td>: null}
                        </tr>
                      )) : <p>No records found</p>}
                    </tbody>
                  </Table>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {data && data.length > 0 ? (
        <Paginations items={data && data} onChangePage={onChangePage} />
      ) : null}
    </div>
  );
}

export default CustomerOrders;