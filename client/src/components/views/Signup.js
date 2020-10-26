import React from "react";
import { Input, FormGroup, Label, Spinner } from "reactstrap";
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
  },
  spinner: {
    color: "#26acd1"
  }
}

const SignupView = ({
  firstName,
  lastName,
  email,
  password,
  phone,
  setEmail,
  setLastName,
  setPassword,
  setPhone,
  setPortfolio,
  setFirstName,
  onRegister,
  auth,
  message,
  userType,
  customer
}) => {
  const positions = [
    "Chief Executive Officer",
    "Chief Operations Officer",
    "Marketer",
    "Chief Finance Officer",
    "Human Resources"
  ];

  const url = window.location.pathname;
  return (
    <div>
      <div style={styles.formContainer}>
        <div className="banner">
          <h5>Welcome Back!</h5>
          <p className="banner-text">Sign up here</p>
        </div>
        <div style={styles.form}>
          {message.length ? <p style={{ color: "#ff0000"}}>{message}</p> : null}
          <p>
            <label htmlFor="fname">First Name</label>
            <Input
              id="fname" 
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
            />
          </p>
          <p>
            <label htmlFor="lname">Last Name</label>
            <Input 
              id="lname" 
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
            />
          </p>
          <p>
            <label htmlFor="phone">Phone</label>
            <Input
              id="phone" 
              placeholder="+234"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />
          </p>
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
          {url === "/" ? null: (
            <p>
              <FormGroup>
                <Label for="portfolio">Select</Label>
                <Input 
                  style={styles.input} 
                  type="select" name="select" 
                  id="portfolio"
                  onChange={(e) => setPortfolio(e.target.value)}
                >

                  <option>Chief executive officer</option>
                  {positions.map((position, i) => (
                    <option key={i} value={position}>{position}</option>
                  ))}
                </Input>
              </FormGroup>
            </p>
          )}
          {auth.signupLoading=== true || auth.registerLoading ? (
            <div className="text-center">
              <Spinner style={styles.spinner} />
            </div>
          ) : (
            <Button onClick={(e) => onRegister(e)} style={styles.button}>sign up</Button>
          )}
          <p className="text-center pb-4">
            {url === "/" ? (
              <Link to="/signin">Sign In instead</Link>
            ) : (
              <Link to="/login">Sign In instead</Link>
            )}
          </p>
        </div>

      </div>
    </div>
  );
}

export default SignupView;