import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { Spinner, Row, Col } from "reactstrap";
import { EyeOutlined } from "@ant-design/icons"
import { Button } from "antd";
import { getEarnings } from "../../../store/actions/earning";
import { deleteRider } from "../../../store/actions/driver";

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

const RiderList = ({ filteredContents, match, riders }) => {
  const [ allEarnings, setEarning ] = useState([]);
  const earnings = useSelector((state) => state.earningReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEarnings());
  }, [ dispatch ]);

  useEffect(() => {
    if (earnings.earningSuccess) {
      setEarning(earnings.earnings);
    }
  }, [ earnings ]);

  const onDelete = (id) => {
    dispatch(deleteRider(id));
  }

  const calculateEarnings = (id) => {
    const filteredData = allEarnings.filter(earnings => earnings.riderId && earnings.riderId._id === id);
    return filteredData.map(data => data.amount).reduce((a, b) => a + b, 0);
  }

  return (
    <>
      <tbody>
        {riders && riders.ridersLoading ? (
          <div className="text-center mt-4" style={{ textAlign: "center"}}>
            <Spinner color="primary" />
          </div>
        ) : filteredContents.length ? filteredContents.map((rider, i) => (
          <tr key={rider._id} style={styles.row}>
            <td style={styles.row}>{rider.firstName && rider.firstName} </td>
            <td style={styles.row}>{rider.lastName && rider.lastName}</td>
            <td style={styles.row}>{rider.phone && rider.phone}</td>
            <td style={styles.row}>{rider.email && rider.email}</td>
            <td style={styles.row}>{ rider && rider.activated ? "Activated" : "Inactive"}</td>
            <td style={styles.row}>{rider && rider.available ? "Available" : "Not avaiable"}</td>
            <td style={styles.row}>{rider && rider.online ? "Online" : "Offline"}</td>
            <td style={{ color: "#ff0000", ...styles.row }}>&#8358; {calculateEarnings(rider._id)}</td>
            <td style={styles.row}>
              <Link to={`${match.url}/${rider._id}`}>View details <EyeOutlined /></Link>
            </td>
            <td style={styles.row}>
              <Row className="justify-content-center">
                <Col xl="12">
                  <Button>Pay</Button>{" "}
                  {riders.deleteRiderLoading ? (
                    <div className="text-center">
                      <Spinner style={styles.spinner} />
                    </div>
                  ) : (<Button onClick={() => onDelete(rider._id)}>delete</Button>)}
                </Col>
              </Row>
            </td>
          </tr>
        )) : <p style={styles.p}>No records found</p>}
      </tbody>
    </>
  );
}

export default RiderList;