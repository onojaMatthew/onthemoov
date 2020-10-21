import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Spinner } from "reactstrap";
import { getNotifications, deleteNotification } from "../../../store/actions/notification";
import { EnterOutlined, DeleteOutlined, EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { Tabs, Input } from "antd";

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
    textAlign: "center"
  },
  icon: {
    fontSize: "16px"
  },
  tr: {
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

const { TabPane } = Tabs;

const NotificationList = () => {
  const [ searchFilter, setSearchFilter ] = useState("");
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notificationReducer);

  useEffect(() => {
    dispatch(getNotifications());
  }, [ dispatch ]);

  const onNavigate = (id) => {
    window.location.href = `/dashboard/notifications/${id}`;
  }

  const onDelete = (id) => {
    dispatch(deleteNotification(id));
  }

  const operations = <div style={styles.searchWrapper}>
      <FilterOutlined style={styles.filterIcon} />
      <Input placeholder="Search..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
    </div>;

  const data = notifications.notifications && notifications.notifications;

  const filteredContents = data && data.filter(content => content.senderId && content.senderId.firstName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 || content.senderId && content.senderId.lastName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1);
  console.log(filteredContents, " filterd contents")
  return (
    <div>
      <Row className="mt-4">
        <Col xs="12" xl="12">
          <Tabs tabBarExtraContent={operations}>
            <TabPane tab={"Notifications"}>
              <Table responsive hover style={styles.table}>

                <tbody>
                  {notifications.getNotificationsLoading ? <Spinner /> : notifications.notifications && notifications.notifications.length ? notifications.notifications.map(notification => (
                    
                    <tr key={notification._id} >
                      <td style={styles.row}>
                        {notification.senderId && notification.senderId.firstName} {notification.senderId && notification.senderId.lastName}
                      </td>
                      <td style={styles.row}>{notification.title && notification.title}</td>
                      <td style={styles.row}>{notification.createdAt && moment(notification.createdAt).format("DD/MM/YY")} <EnterOutlined style={styles.icon} /></td>
                      {notifications.deleteNotificationLoading ? <Spinner color="primary" /> : <td 
                        style={{ textAlign: "center", cursor: "pointer" }} onClick={() => onNavigate(notification._id)}><EyeOutlined style={{ color: "green"}} /> View</td>}
                      <td 
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={() => onDelete(notification._id)}
                      ><DeleteOutlined style={{ color: "#ff0000"}} /> Delete</td>
                    </tr>
                  )) : filteredContents.length ? filteredContents.map(notification => (
                    <tr key={notification._id} >
                      <td style={styles.row}>
                        {notification.senderId && notification.senderId.firstName} {notification.senderId && notification.senderId.lastName}
                      </td>
                      <td style={styles.row}>{notification.title && notification.title}</td>
                      <td style={styles.row}>{notification.createdAt && moment(notification.createdAt).format("DD/MM/YY")} <EnterOutlined style={styles.icon} /></td>
                      {notifications.deleteNotificationLoading ? <Spinner color="primary" /> : <td 
                        style={{ textAlign: "center", cursor: "pointer" }} onClick={() => onNavigate(notification._id)}><EyeOutlined style={{ color: "green"}} /> View</td>}
                      <td 
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onClick={() => onDelete(notification._id)}
                      ><DeleteOutlined style={{ color: "#ff0000"}} /> Delete</td>
                    </tr>
                  )) : <p>No records found</p>}
                </tbody>
              </Table>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default NotificationList;