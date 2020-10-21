import React from "react";
import { Button, notification } from 'antd';

const styles = {
  button: {
    // backgroundColor: "#ccc",
    minWidth: "100%",
    marginTop: "10px"
  }
}
const NotificationAlert = (props) => {

  const close = (key) => {
    notification.close(key)
  };

  const onOpen = () => {
    window.location.href = `/dashboard/notifications/${props.notification._id}`
  }
  
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => onOpen()}>
        Open
      </Button>
    );
    notification.open({
      message: `${props.notification && props.notification.title && props.notification.title.slice(0, 20)}`,
      description:
        `${props.notification && props.notification.message.slice(0, 70)}`,
      btn,
      key,
      onClose: close(key),
    });
  };

  return (
    <div>
      <Button style={styles.button} onClick={openNotification}>
        {props.notification && props.notification.senderId && props.notification.senderId.firstName} sent a message
      </Button>
    </div>
  );
}

export default NotificationAlert;