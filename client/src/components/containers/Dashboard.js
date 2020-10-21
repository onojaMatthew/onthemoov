import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Layout } from 'antd';

import SideComponent from "./Sidebar";
import Container from "./Container";
import { getNotifications } from "../../store/actions/notification";
import { localAuth } from "../../helper/authentcate";

const { Footer } = Layout;

const Dashboard = ({ match }) => {
  const dispatch = useDispatch();
  const [ collapsed, setCollapse ] = useState(false);

  const onCollapse = collapsed => {
    setCollapse(collapsed);
  };


  useEffect(() => {
    dispatch(getNotifications());
  }, [ dispatch ]);

  useEffect(() => {
    const token = localAuth().token && localAuth().token;
    const userType = localAuth().user && localAuth().user.role;
    if (!token) {
      window.location.href = "/login";
    } else if (userType !== "admin" && userType !== "user") {
      window.location.href = "/customer_booking";
    }
  }, []);

  return(
    <Layout>
      <SideComponent onCollapse={onCollapse} collapsed={collapsed} />
      <Layout className="site-layout">
        <Container match={match} />
        <Footer style={{ textAlign: 'center' }}>
          MOOV &copy;{new Date().getFullYear()} making delivery easy.
        </Footer>
      </Layout>
    </Layout>
  )  
}

export default Dashboard;

// style={{ minHeight: '100vh' }} got this from the layout tag

