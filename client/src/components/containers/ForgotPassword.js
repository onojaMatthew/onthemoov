import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { forgotPassword } from "../../store/actions/authentication";
import ForgotView from "../views/ForgotView";

const styles = {
  container: {
    position: "relative",
    top: 0,
    paddingTop: 50
  }
}

const ForgotPassword = () => {
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ resetMessage, setResetMessage ] = useState("");
  const [ userEmail, setUserEmail ] = useState("");

  const onForgot = (e) => {
    e.preventDefault();
    setUserEmail(email);
    const data = { email };
    dispatch(forgotPassword(data, "admin"));
    setEmail("");
    setMessage("");
  }

  useEffect(() => {
    if (auth && auth.error && auth.error.length) {
      setMessage(auth.error);
    }
  }, [ auth ]);

  useEffect(() => {
    if (auth && auth.forgotSuccess === true) {
      setResetMessage(`A password reset token was sent to your ${userEmail}. Please proceed to your email to continue.`);
    }
  }, [ auth, userEmail ]);

  const onResendEmail = () => {
    const data = { email: userEmail }
    dispatch(forgotPassword(data, "admin"));
  }

  return (
    <div style={styles.container}>
      <Row className="justify-content-center">
        <Col xs="11" xl="3">
          <ForgotView
            email={email}
            setEmail={setEmail}
            onForgot={onForgot}
            message={message}
            auth={auth}
            userEmail={userEmail}
            resetMessage={resetMessage}
            onResendEmail={onResendEmail}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ForgotPassword;