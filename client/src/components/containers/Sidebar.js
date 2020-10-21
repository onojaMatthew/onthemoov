import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  FileTextOutlined,
  CarOutlined,
  BellOutlined,
  FileAddFilled,
  ShoppingFilled,
  CarFilled,
  SettingFilled,
  BellFilled,
  DashboardFilled,
  LogoutOutlined
} from '@ant-design/icons';
// import { Col, Row } from "reactstrap";
import Logo from "../../assets/onthemoov_logo2.png";
import Auth from "../../helper/Auth";

const { Sider } = Layout;

const styles = {
  container: {
    background: "#fff"
  },
  icon: {
    color: "#26acd1"
  },
  menu: {
    marginTop: 0
  },
  link: {
    color: "#fff"
  }
}

const SideComponent = ({ onCollapse, collapsed }) => {
  const onLogout = () => {
    Auth.deauthenticateUser();
    window.location.href = "/login";
  }
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light">
      <div className="logo">
        <img src={Logo} alt="logo" style={{ width: "100%", margin: "auto"  }} className="responsive" />
      </div>
      <Menu theme="light" style={styles.menu} defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DashboardFilled />}>
          <Link style={StyleSheet.link} to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FileAddFilled />}>
          <Link style={StyleSheet.link} to="/dashboard/booking">Book</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BellFilled />}>
          <Link to="/dashboard/notifications">Recent notifications</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UsergroupAddOutlined />}>
          <Link to="/dashboard/customers">Customers</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UsergroupAddOutlined />}>
          <Link to="/dashboard/pending_customer_orders">Pending Orders</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<CarFilled />}>
          <Link to="/dashboard/riders">Riders</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<ShoppingFilled />}>
          <Link to="/dashboard/transactions">Transactions</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<UserAddOutlined />}>
          <Link to="/dashboard/new_riders">New riders</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<SettingFilled />}>
          <Link to="/dashboard/settings">Settings</Link>
        </Menu.Item>
        <Menu.Item key="10" icon={<LogoutOutlined />}>
          <span onClick={() => onLogout()}>Logout</span>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideComponent;