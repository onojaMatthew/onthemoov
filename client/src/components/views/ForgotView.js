import React from "react";
import { Input, Spinner } from "reactstrap";
import { Button } from "antd";

const styles = {
  container: {
    paddingTop: 60
  },
  formContainer: {
    background: "#fff",
    boxShadow: "6px 6px 35px #0000000F",
    borderRadius: "10px",
    opacity: 1,
    paddingBottom: "35px"
  },
  form: {
    paddingLeft: "34px",
    paddingRight: "34px",
    marginTop: "-40px",
  },
  input: {
    background: "transparent",
    border: "2px solid #70707024",
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
    marginBottom: "15px",
    height: "40px"
  },
  resendEmail: {
    color: "#26acd1",
    marginBottom: "35px",
    cursor: "pointer"
  },
  spinner: {
    color: "#26acd1"
  }
}

const ForgotView = ({
  auth,
  email,
  setEmail,
  onForgot,
  message,
  resetMessage,
  onResendEmail
}) => {
    
  return (
    <div style={styles.container}>
      {resetMessage.length ? <p className="text-center">{resetMessage}</p> : null}
      <div style={styles.formContainer}>
        <div className="banner">
          <h5>Welcome Back!</h5>
          <p className="banner-text">Forgot your password</p>
        </div>
        <div style={styles.form}>
          {message.length ? <p style={{ color: "#ff0000" }}>{message}</p> : null}
          <p>Enter your email to continue</p>
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
          {auth && auth.forgotLoading ? (
            <div className="text-center">
              <Spinner style={styles.spinner} />
            </div>
          ) : (
            <Button onClick={(e) => onForgot(e)} style={styles.button}>Send</Button>
          )}
          <p>Click <span onClick={() => onResendEmail()} style={styles.resendEmail}>here</span> to resend email</p>
        </div>
      </div>
    </div>
  );
}

export default ForgotView;