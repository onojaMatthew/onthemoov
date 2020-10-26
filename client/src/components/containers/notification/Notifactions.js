import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Card, Spinner } from "reactstrap";
import { Button, Input } from "antd";
import { localAuth } from "../../../helper/authentcate";
import { 
  getNotification,
  viewStatus,
  reply
} from "../../../store/actions/notification";
import Avatar from "../../../assets/avatar.png";
import { FilePdfOutlined } from "@ant-design/icons";

const BASE_URL = process.env.REACT_APP_API_URL;

const styles = {
  img: {
    width: "100%",
    // borderRadius: "50%"
  },
  imgContainer: {
    width: "130px",
    borderRadius: "50%",
  },
  button: {
    background: "#26acd1",
    color: "#fff",
    padding: "7px",
    borderRadius: "5px",
    height: "40px"
  },
  border: "none",
  spinner: {
    color: "#26acd1"
  }
}

const { TextArea } = Input;

const Notifications = (props) => {
  const { match } = props;
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notificationReducer);
  const [ message, setMessage ] = useState("");
  const notificationId = match.params.notificationId;
  const data = notifications.notification && notifications.notification;

  useEffect(() => {
    dispatch(getNotification(notificationId));
    dispatch(viewStatus(notificationId));
  }, [ dispatch, notificationId ]);

  const onReply = () => {
    const email = data.senderId && data.senderId.email;
    console.log(email, "email address")
    const messageBody = { message, email: email, adminId: localAuth().user && localAuth().user._id };
    dispatch(reply(notificationId, messageBody));
    setMessage("");
  }

  const loading = notifications.replyLoading && notifications.replyLoading;

  return (
    <div>
      <Row>
        <Col xs="12" xl="2">
          <div style={styles.imgContainer}>
            <img style={styles.img} src={`${BASE_URL}/photo/${data && data.senderId && data.senderId.role}/${data && data.senderId && data.senderId._id}?${new Date().getTime()}`} 
            onError={i => i.target.src = `${ Avatar }`}
            alt="ava" />
          </div>
        </Col>
        {/* Notification content area */}
        <Col xs="12" xl="10">
          <Row>
            <Col xs="12" xl="10">
              <p><strong>{data.senderId && data.senderId.firstName} {data.senderId && data.senderId.lastName}</strong></p>
            </Col>
            <Col xs="2" xl="2">

            </Col>
          </Row>
          <Row>
            <Col xs="12" xl="9">
              <p>Email address: {data.senderId && data.senderId.email}</p>
              <p style={{ lineHeight: 0.5}}>Phone: {data.senderId && data.senderId.phone}</p>
            </Col>
            <Col xs="2" xl="2" className="mt-4">
              <Button style={styles.button} color="primary" icon={<FilePdfOutlined />}>
                See Attachment
              </Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <p>
              <strong>{data.title && data.title}</strong>
            </p>
          </Row>
          <Row>
            <p>
              {data.message && data.message}
            </p>
          </Row>
          {data.reply && data.reply.length ? <hr /> : null}
          {data.reply && data.reply.length ? <p><strong>Admin Reply</strong></p> : null}
          <Row className="ml-5">
            <p>
              {data.reply && data.reply}
            </p>
          </Row>
          
          <Row className="mt-3">
            <p><strong>Reply</strong> by Admin</p>
          </Row>
          <Row className="mt-3">
            <Card>
              <TextArea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                rows={4} 
                cols={88}
              />
            </Card>
          </Row>
          <Row className="mt-2">
            <Col xs="12" xl="10"></Col>
            <Col xs="12" xl="2">
              {loading ? <Spinner style={styles.spinner} /> : (
                <Button onClick={() => onReply()} style={styles.button}>Send message</Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Notifications;