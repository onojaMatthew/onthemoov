import React from "react";
import { Input, Spinner } from "reactstrap";
import { Button } from "antd";
import { Link } from "react-router-dom";

const styles = {
  formContainer: {
    background: "#fff",
    boxShadow: "6px 6px 35px #0000000F",
    borderRadius: "10px",
    opacity: 1,
  },
  form: {
    paddingLeft: "34px",
    paddingRight: "34px",
    marginTop: "-40px",
  },
  input: {
    background: "transparent",
    border:" 2px solid #70707024",
    borderRadius: "5px",
    opacity: 1,
    height: "33px",
    fontSize: "12px"
  },
  button: {
    background: "#26acd1",
    width: "100%",
    borderRadius: "5px",
    color: "#fff",
    marginBottom: "35px",
    height: "40px"
  }
}

const LoginView = ({
  auth,
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  message,
  userType
}) => {
    
  return (
    <div>
      <div style={styles.formContainer}>
        <div className="banner">
          <h5>Welcome Back!</h5>
          <p className="banner-text">Login here</p>
        </div>
        <div style={styles.form}>
          {message.length ? <p style={{ color: "#ff0000" }}>{message}</p> : null}
          <p>
            <label htmlFor="email">Email</label>
            <Input 
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <Input 
              type='password' 
              id="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </p>
          <p className="text-right">
            <Link to="/forgot_password">Forgot password</Link>
          </p>
          {auth && auth.loginLoading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <Button onClick={(e) => onLogin(e)} style={styles.button}>sign In</Button>
          )}
          <p className="text-center pb-4">
            {userType && userType === "customer" ? (
              <Link to="/">Sign up instead</Link>
            ) : (
              <Link to="/admin">Sign up instead</Link>
            )}
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginView;