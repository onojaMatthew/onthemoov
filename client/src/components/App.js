import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from './containers/Signup';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import ForgotPassword from './containers/ForgotPassword';
import ResetPassword from './containers/ResetPassword';
import AdminSignup from './containers/AdminSignup';
import CustomerRegistration from './containers/CustomerRegistration';
import Signin from './containers/Signin';
import CustomerBookingCustomer from './containers/booking/CustomerBookingContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={(props) => <CustomerRegistration {...props} />} />
        <Route exact path="/admin" render={(props) => <Signup {...props} />} />
        <Route exact path="/login" render={(props) => <Login {...props} /> } />
        <Route exact path="/signin" render={(props) => <Signin {...props} /> } />
        <Route exact path="/forgot_password" render={(props) => <ForgotPassword {...props} />} />
        <Route exact path="/admin_signup" render={(props) => <AdminSignup {...props} />} />
        <Route exact path="/reset_password/:token" render={(props) => <ResetPassword {...props} />} />
        <Route path="/customer_booking" render={(props) => <CustomerBookingCustomer {...props} />} />
        <Route path="/dashboard" render={(props) => <Dashboard {...props} />} /> 
      </Router>
    </div>
  );
}

export default App;
