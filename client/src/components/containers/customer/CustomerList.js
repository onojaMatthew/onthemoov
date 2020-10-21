import React, { useEffect } from "react";
import moment from "moment";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { message } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../../../store/actions/customer";

const styles = {
  row: {
    padding: "7px"
  },
  p: {
    textAlign: "center",
    fontSize: "18px"
  },
  spinner: {
    color: "#26acd1"
  }
}

const CustomerList = ({ filteredContents, match, customers, pageOfItems}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (customers.deleteCustomerSuccess) {
      message.success("Message deleted");
    }
  }, [ customers ]);
  
  const onDelete = (id) => {
    dispatch(deleteCustomer(id))
  }

  return (
    <>
      <tbody>
        {customers && customers.customersLoading ? (
          <div className="text-center mt-4" style={{ textAlign: "center"}}>
            <Spinner color="primary" />
          </div>
        ) : filteredContents.length ? filteredContents.map((customer, i) => (
          <tr key={customer._id} style={styles.row}>
            <td style={styles.row}>{i + 1}</td>
            <td style={styles.row}>{customer.firstName && customer.firstName} {customer.lastName && customer.lastName}</td>
            <td style={styles.row}>{customer.phone && customer.phone}</td>
            <td style={styles.row}>{customer.email && customer.email}</td>
            <td style={styles.row}>{customer.createdAt && moment(customer.createdAt).format("DD/MM/YY, hh:mm:ss")}</td>
            <td style={{textAlign: "center", ...styles.row}}>
              <Link to={`${match.url}/${customer._id}`}>
                <EyeOutlined style={{ cursor: "pointer" }} />
              </Link>
            </td>
            <td style={{textAlign: "center", ...styles.row}}>
              <DeleteOutlined onClick={() => onDelete(customer._id)} style={{ color: "#ff0000", cursor: "pointer" }} />
            </td>
          </tr>
        )) : pageOfItems && pageOfItems.length ? pageOfItems.map((customer, i) => (
          <tr key={customer._id} style={styles.row}>
            <td style={styles.row}>{i + 1}</td>
            <td style={styles.row}>{customer.firstName && customer.firstName} {customer.lastName && customer.lastName}</td>
            <td style={styles.row}>{customer.phone && customer.phone}</td>
            <td style={styles.row}>{customer.email && customer.email}</td>
            <td style={styles.row}>{customer.createdAt && moment(customer.createdAt).format("DD/MM/YY, hh:mm:ss")}</td>
            <td style={styles.row}>
              <Link to={`${match.url}/${customer._id}`}>
                <EyeOutlined />
              </Link>
            </td>
            <td style={{ ...styles.row}}>
              {customers.deleteCustomerLoading ? (
                <div className="text-center">
                  <Spinner style={styles.spinner} />
                </div>
              ) : <DeleteOutlined style={{ cursor: "pointer" }} onClick={() => onDelete(customer._id)} />}
            </td>
          </tr>
        )): <p style={styles.p}>No records found</p>}
      </tbody>
    </>
  )
}

export default CustomerList;