import React from "react";
import { Layout, Menu } from 'antd';
import { BellOutlined } from "@ant-design/icons"
import NotificationAlert from "../views/Notification";

const { Sider } = Layout;

const NotificationSidebar = ({ allNotifications }) => {
  const slicedData = allNotifications.length && allNotifications.slice(0, 10);
  const filteredData = slicedData && slicedData.filter(data => data.isViewed === true);
  return (
    <Sider className="p-1 notification" theme="light">
      <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<BellOutlined />}>
          Recent notifications
        </Menu.Item>
      </Menu>
      {filteredData && filteredData.map(notification => (
        <NotificationAlert notification={notification} key={notification._id} />
      ))}
    </Sider>
  );
}

export default NotificationSidebar;