import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { login } from "../../store/actions/authentication";
import LoginView from "../views/LoginView";

const styles = {
  container: {
    position: "relative",
    top: 0,
    paddingTop: 50,
  }
}

const Login = (props) => {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ message, setMessage ] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    
    const data ={ email, password };
    dispatch(login(data, "admin"));
    setEmail("");
    setPassword("");
    setMessage("");
  }

  useEffect(() => {
    if (auth && auth.error && auth.error.length) {
      setMessage(auth.error);
    }
  }, [ auth ]);

  useEffect(() => {
    if (auth && auth.loginSuccess === true) {
      window.location.href = "/dashboard";
    }
  }, [ auth, props.history ]);

  return (
    <div style={styles.container}>
      <Row className="justify-content-center">
        <Col xs="11" xl="3">
          <LoginView
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onLogin={onLogin}
            message={message}
            auth={auth}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Login;