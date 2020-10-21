import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import SignupView from "../views/Signup";
import { register } from "../../store/actions/authentication";

const styles = {
  container: {
    position: "relative",
    top: 0,
    paddingTop: 50
  }
}

const CustomerRegistration = (props) => {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [ firstName, setFirstName] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ message, setMessage ] = useState("");

  const onRegister = (e) => {
    e.preventDefault();

    const data ={ firstName, lastName, email, password, phone };
    dispatch(register(data, "customer"));
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setMessage("");
  }

  useEffect(() => {
    if (auth && auth.error && auth.error.length) {
      setMessage(auth.error);
    }
  }, [ auth ]);

  useEffect(() => {
    if (auth && auth.registerSuccess === true) {
      window.location.href = "/signin";
    }
  }, [ auth, props.history ]);

  return (
    <div style={styles.container}>
      <Row className="justify-content-center">
        <Col xs="11" xl="3">
          <SignupView
            firstName={firstName}
            lastName={lastName}
            email={email}
            password={password}
            phone={phone}
            setEmail={setEmail}
            setLastName={setLastName}
            setPassword={setPassword}
            setPhone={setPhone}
            setFirstName={setFirstName}
            onRegister={onRegister}
            auth={auth}
            message={message}
            userType={"customer"}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CustomerRegistration;