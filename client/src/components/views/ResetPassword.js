import React from "react";
import { Input, Spinner } from "reactstrap";
import { Button } from "antd";

const styles = {
  container: {
    paddingTop: 50
  },
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
  },
  spinner: {
    color: "#26acd1"
  }
}

const ResetPasswordView = ({
  auth,
  password,
  setPassword,
  onResetPassword,
  message,
}) => {
    
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div className="banner">
          <h5>Welcome Back!</h5>
          <p className="banner-text">Reset your password</p>
        </div>
        <div style={styles.form}>
          {message.length ? <p style={{ color: "#ff0000" }}>{message}</p> : null}
          <p>Enter your new password</p>
          <p>
            <label htmlFor="email">Password</label>
            <Input 
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </p>
          {auth && auth.resetLoading ? (
            <div className="text-center">
              <Spinner style={styles.spinner} />
            </div>
          ) : (
            <Button onClick={(e) => onResetPassword(e)} style={styles.button}>Send</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordView;