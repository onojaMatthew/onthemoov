import React from "react";
import { Spinner } from "reactstrap";

const styles = {
  row: {
    padding: "7px"
  },
  p: {
    textAlign: "center",
    fontSize: "18px"
  }
}
const OrderListview = ({ orders, pageOfItems }) => {
  
  return (
    <>
    <tbody>
      {orders && orders.ordersLoading ? (
        <div className="text-center mt-4" style={{ textAlign: "center"}}>
          <Spinner color="primary" />
        </div>
      ) : pageOfItems && pageOfItems.length ? pageOfItems.map((order, i) => (
        <tr key={order._id} style={styles.row}>
          <td style={styles.row}>{i + 1}</td>
          <td style={styles.row}>{order.senderId && order.senderId.firstName} {order.senderId && order.senderId.lastName}</td>
          <td style={styles.row}>{order.riderId ? order.riderId.firstName : "No rider" }</td>
          <td style={styles.row}>{order && order.vehicleType && order.vehicleType.charAt(0).toUpperCase() + order.vehicleType.slice(1)}</td>
          <td style={styles.row}>{order && order.cost}</td>
          <td style={styles.row}>{order && order.tripCompleted === true ? "Delivered" : order.on_going === true ? "On going" : order.cancelled === true ? "Cancelled" : "Requested"}</td>
        </tr>
      )): <p style={styles.p}>No records found</p>}
      
    </tbody>
    </>
  );
}

export default OrderListview;