import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { resetPassword } from "../../store/actions/authentication";
import ResetPasswordView from "../views/ResetPassword";

const styles = {
  container: {
    position: "relative",
    top: 0,
    paddingTop: 50
  }
}

const ResetPassword = (props) => {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [ password, setPassword ] = useState("");
  const [ message, setMessage ] = useState("");

  const token = window.location.pathname.slice(16, 56);
  const onResetPassword = (e) => {
    e.preventDefault();
    
    const data = { password, token };
    dispatch(resetPassword(data, "admin"));
    setPassword("");
    setMessage("");
  }

  useEffect(() => {
    if (auth && auth.error && auth.error.length) {
      setMessage(auth.error);
    }
  }, [ auth ]);

  useEffect(() => {
    if (auth && auth.resetSuccess === true) {
      props.history.push("/login");
    }
  }, [ auth, props.history ]);

  return (
    <div style={styles.container}>
      <Row className="justify-content-center">
        <Col xs="11" xl="3">
          <ResetPasswordView
            password={password}
            setPassword={setPassword}
            onResetPassword={onResetPassword}
            message={message}
            auth={auth}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ResetPassword;