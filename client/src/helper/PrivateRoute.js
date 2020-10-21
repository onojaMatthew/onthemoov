import React from "react";
import { Route, Redirect } from 'react-router-dom';
import Auth from "./Auth";
// import Login from "../components/containers/Login";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => Auth.isUserAuthenticated() ? (
//     <Component {...props} />
//   ) : (
//     <Redirect to={{
//       pathname: "/signup",
//       state: { from: props.location}
//     }}/>
//   )} />
// )

const PrivateRoute = ({ component, ...options }) => {
  const authenticated = Auth.isUserAuthenticated();

  return <Route {...options} render={(props) => authenticated ? <component /> : <Redirect to="/login" />} />;
};

export default PrivateRoute;