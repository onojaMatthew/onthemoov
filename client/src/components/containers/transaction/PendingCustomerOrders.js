import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Table, Spinner } from "reactstrap";
import { Input, Tabs, message, Button } from "antd";
import { getOrders, deleteOrder, completeTrip } from "../../../store/actions/order";
import Paginations from "../../views/Pagination";
import { EyeOutlined, DeleteOutlined, FilterOutlined } from "@ant-design/icons";
import { localAuth } from "../../../helper/authentcate";
import SocialShare from "../../views/SocialShare";

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
    // textAlign: "center"
    fontSize: "12px"
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
  },
  spinner: {
    color: "#26acd1"
  }
}

const PendingCustomerOrders = (props) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer);
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);
  const [ search, setSearch ] = useState("");

  const role = localAuth().user && localAuth().user.role;
  const userId = localAuth().user && localAuth().user._id;

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
      const customerOrders = allOrders.filter(orders => orders.orderBy && orders.orderBy === "customer")
      setData(customerOrders);
    }
  }, [ orders ]);

  const onView = (id) => {
    
    window.location.href = `/dashboard/transactions/${id}`;
  }

  const onDelete = (id) => {
    dispatch(deleteOrder(id));
  }

  const onCompleteOrder = (orderId) => {
    dispatch(completeTrip(orderId, userId));
  }

  const share = (id) => {
    const sharedOrder = data && data.find(order => order._id === id);
    const deliveryAddr = sharedOrder && sharedOrder.deliveryLocation.map(data => data.address);
    const addres = sharedOrder && sharedOrder.deliveryLocation && sharedOrder.deliveryLocation[0] && sharedOrder.deliveryLocation[0].receiver;
    const orderData = `
      MOOV DELIVERY REQUEST\n
      Receiver: ${sharedOrder && sharedOrder.deliveryLocation && sharedOrder.deliveryLocation[0] && sharedOrder.deliveryLocation[0].receiver}.\n 
      Receiver phone: ${sharedOrder && sharedOrder.deliveryLocation && sharedOrder.deliveryLocation[0] && sharedOrder.deliveryLocation[0].receiverPhone}.\n 
      Pickup Address: ${sharedOrder && sharedOrder.pickupLocation}.\n
      OrderId: ${sharedOrder && sharedOrder.trxnId}.\n
      Cost: ${sharedOrder && sharedOrder.cost}.\n
      Vehicle Type: ${sharedOrder && sharedOrder.vehicleType}.\n
      Payer: ${sharedOrder && sharedOrder.payer}\n.
      Delivery address: ${deliveryAddr && JSON.stringify(...deliveryAddr)}
    `;
    return orderData;
  }

  const operations = <div style={styles.searchWrapper}>
      <FilterOutlined style={styles.filterIcon} /> 
      <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>;
  const filterData = data.filter(orders => orders.senderId && orders.senderId.firstName && orders.senderId.firstName.toLowerCase().indexOf(search) !== -1 || orders.trxnId && orders.trxnId.toLowerCase().indexOf(search) !== -1);
  
  return (
    <div>
      <Row className="mt-3 ustify-content-center">
        <Col xs="11" xl="12">
          <Tabs tabBarExtraContent={operations}>
            <TabPane tab={data && data.length + " Orders"} key="1">
              <Table responsive hover>
                <thead>
                  <tr style={styles.thead}>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Pick-up address</th>
                    <th style={styles.th}>Vehicle type</th>
                    <th style={styles.th}>Order ID</th>
                    <th style={styles.th}>No. of stops</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Share</th>
                    <th style={styles.th}>View</th>
                    <th style={styles.th}>Action</th>
                    {role === "admin" ? <th style={styles.th}>Delete</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {orders.ridersLoading ? <Spinner color="primary" /> : filterData && filterData.length ? filterData.map(order => (
                    <tr>
                      <td style={styles.table}>{order.senderId && order.senderId.firstName} {order.senderId && order.senderId.lastName}</td>
                      {/* <td>{order.riderId && order.riderId.firstName} {order.riderId && order.riderId.lastName}</td> */}
                      <td style={styles.table}>{order.pickupLocation} </td>
                      <td style={styles.table}>{order.vehicleType && order.vehicleType.charAt(0).toUpperCase() + order.vehicleType.slice(1)}</td>
                      <td style={styles.table}>{order.trxnId}</td>
                      <td style={styles.table}>{order.deliveryLocation && order.deliveryLocation.length}</td>
                      <td style={styles.table}>{order.cost}</td>
                      <td style={{ color: order.on_going ? "blue" : order.tripCompleted ? "Green" : order.cancelled ? "red" : ""}}>{order.on_going ? "On going" : order.tripCompleted ? "Delivered" : order.cancelled ? "Cancelled" : "Requested"}</td>
                      <td>
                        <SocialShare orderId={order._id} share={share}  />
                      </td>
                      <td>
                        <EyeOutlined onClick={() => onView(order._id)} />
                      </td>
                      <td>
                        {order.tripCompleted ? "Delivered" : (
                          orders.completeLoading === true ? (
                            <div className="text-center">
                              <Spinner style={styles.spinner} />
                            </div>
                          ) : (
                            <Button onClick={() => onCompleteOrder(order._id)}>Complete</Button>
                          )
                        )}
                      </td>
                      {role === "admin" ? <td>
                        <span style={styles.delete} onClick={() => onDelete(order._id)}>
                          {orders.deleteLoading ? (
                            <div className="text-center">
                              <Spinner style={styles.spinner} />
                            </div>
                          ) : (
                            <DeleteOutlined />
                          )}
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
      {data && data.length > 0 ? (
        <Paginations items={data && data} onChangePage={onChangePage} />
      ) : null}
    </div>
  );
}

export default PendingCustomerOrders;