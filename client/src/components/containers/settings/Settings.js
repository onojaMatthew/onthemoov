import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardBody, Input, Spinner, Container } from "reactstrap";
import { Button, Modal } from "antd";
import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { addVehicle, getVehicles, updateVehicle } from "../../../store/actions/vehicle";
import { getTerms, addTerms, updateTerms, deleteTerms } from "../../../store/actions/terms&conditions";
import { getPolicy, addPolicy, updatePolicy, deletePolicy } from "../../../store/actions/privacyPolicy";

const styles = {
  newTransit: {
    float: "right"
  },
  button: {
    background: "#26ACD10F",
    border: "1px solid #26ACD1",
    borderRadius: "15px",
    fontSize: "12px",
    color: "#26ACD1",
    width: "100%",

    opacity: 1,
  },
  saveButton: {
    color: "#fff",
    width: "100%",
    background: "#26ACD1",
    borderRadius: "5px",
    height: "40px",
    opacity: 1
  },
  label: {
    color: "#37373A",
    letterSpacing: "0px"
  },
  termContainer: {
    border: "1px solid #333",
    textAlign: "center"
  },
  backArrow: {
    marginBottom: "10px",
    border: "1px solid #333",
    borderRadius: "50%",
    padding: "10px"
  },
  newText: {
    color: "#26ACD1"
  }
}

const Settings = (props) => {
  const [ visible, setVisible ] = useState(false);
  const [ isPrivacyPolicy, setPrivacyPolicy ] = useState(false);
  const [ isTerms, setTerms ] = useState(false);
  const [ isTerm, setIsTerm ] = useState(false);
  const [ isPolicy, setIsPolicy ] = useState(false);
  const [ minimumFare, setMinimumFare ] = useState("");
  const [ baseFare, setBaseFare ] = useState("");
  const [ type, setVehicleType ] = useState("");
  const [ amount, setAmount ] = useState("");
  const [ data, setData ] = useState("");
  const [ termData, setTerm ] = useState("");
  const [ isEdit, setIsEdit ] = useState(false);
  const [ transit_type, setTransit_type ] = useState("");
  const vehicles = useSelector((state) => state.vehicleReducer);
  const policy = useSelector((state) => state.policyReducer);
  const terms_condition = useSelector((state) => state.termsReducer);
  const [ isNewTransit, setNewTransit ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicles());
    dispatch(getTerms());
    dispatch(getPolicy());
  }, [ dispatch ]);

  const showModal = (name) => {
    if (name === "policy") {
      setIsPolicy(true);
      setIsTerm(false);
    } else if (name === "terms") {
      setIsTerm(true);
      setIsPolicy(false);
    }

    setVisible(true);
  };

  const toggleIsEdit = (name) => {
    if (name === "policy") {
      setIsPolicy(true);
      setIsTerm(false);
    } else if (name === "terms") {
      setIsTerm(true);
      setIsPolicy(false);
    }

    setIsEdit(true)
  }

  const closeModal = () => {
    setIsEdit(false);
  }

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onAdd = () => {
    const data = { type }
    dispatch(addVehicle(data));
  }

  const onUpdateVehicle = () => {
    const data = { baseFare, minimumFare, per_distance_charge: amount };
    dispatch(updateVehicle(data, transit_type));
    setAmount("");
    setBaseFare("");
    setMinimumFare("");
  }

  const onDeletePolicy = () => {
    const policyId = policy.policy && policy.policy[0] && policy.policy[0]._id;
    dispatch(deletePolicy(policyId));
  }

  const onDeleteTerm = () => {
    const termsId = terms_condition.term && terms_condition.term[0] && terms_condition.term[0]._id;
    dispatch(deleteTerms(termsId));
  }

  const onAddPolicy = () => {
    const mydata = { data }
    dispatch(addPolicy(mydata));
  }

  const onUpdatePolicy = () => {
    const policyId = policy.policy && policy.policy[0] && policy.policy[0]._id;
    const mydata = { data }
    dispatch(updatePolicy(mydata, policyId));
  }

  const onAddTerm = () => {
    const myData = { termData}
    dispatch(addTerms(myData));
  }

  const onUpdateTerm = () => {
    const termsId = terms_condition.term && terms_condition.term[0] && terms_condition.term[0]._id;
    const mydata = { termData }
    dispatch(updateTerms(mydata, termsId));
  }

  const allVehicles = vehicles.vehicles && vehicles.vehicles;
  const term = terms_condition && terms_condition.term;
  const policyData = policy && policy.policy;

  return (
    <div>
      {isPrivacyPolicy ? (
        <Container>
          <Row>
            <Col xs="12" xl="6">
              <ArrowLeftOutlined style={styles.backArrow} onClick={() => setPrivacyPolicy(false)} />
            </Col>
            <Col xs="12" xl="6">
              {policy.deleteLoading ? (
                <div className="text-center">
                  <Spinner />
                </div>
              ) : (
                <Button style={{ color: "#fff", background: "#26ACD1", float: "right"}} icon={<DeleteOutlined />} onClick={() => onDeletePolicy()}>Delete</Button>
              )}
            </Col>
          </Row>
          
          <Row>
            <Col xs="12" xl="12" style={styles.termContainer}>
              <h4>Privacy Policy</h4>
              <p>{policyData && policyData[0] ? policyData[0].policy : "Record empty"}</p>
            </Col>
          </Row>
        </Container>
      ) : isTerms ? (
        <Container>
          <Row>
            <Col xs="12" xl="6">
              <ArrowLeftOutlined style={styles.backArrow} onClick={() => setTerms(false)} />
            </Col>
            <Col xs="12" xl="6">
            {terms_condition.deleteLoading ? (
                <div className="text-center">
                  <Spinner />
                </div>
              ) : (
                <Button style={{ color: "#fff", background: "#26ACD1", float: "right"}} icon={<DeleteOutlined />} onClick={() => onDeleteTerm()}>Delete</Button>
              )}
            </Col>
          </Row>
          
          <Row style={styles.termContainer}>
            <Col xs="12" xl="12" style={styles.termContainer}>
              <h4 className="mt-2">Terms and Condition</h4>
              <p>{term && term[0] ? term[0].terms : "Record empty"}</p>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Row className="mt-3">
            <Col xs="12" xl="5">
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="12" xl="6" className="pt-2">
                      <h6><strong>Terms & Conditions</strong></h6>
                    </Col>
                    <Col xs="12" xl="6">
                      <Row>
                        <Col xs="6">
                          <Button onClick={() => setTerms(true)} style={styles.button}>View</Button>
                        </Col>
                        <Col xs="6">
                          {term && term.length ? (
                            <Button onClick={() => toggleIsEdit("terms")} style={styles.button}>Edit</Button>
                          ) : (
                            <Button onClick={() => showModal("terms")} style={styles.button}>Add</Button>
                          )}
                          
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12" xl="5" className="privacy-col">
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="12" xl="6" className="pt-2">
                      <h6 className="mt-2"><strong>Privacy Policy</strong></h6>
                    </Col>
                    <Col xs="12" xl="6">
                      <Row>
                        <Col xs="6">
                          <Button onClick={() => setPrivacyPolicy(true)} style={styles.button}>View</Button>
                        </Col>
                        <Col xs="6">
                        {policyData && policyData.length ? (
                            <Button onClick={() => toggleIsEdit("policy")} style={styles.button}>Edit</Button>
                          ) : (
                            <Button onClick={() => showModal("policy")} style={styles.button}>Add</Button>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs="12" xl="4">
              <Card>
                <CardBody>
                  <Row>
                    <Col xs="12" xl="6"></Col>
                    <Col xs="12" xl="6">
                      <p style={styles.newText} onClick={() => setNewTransit(true)}>New transit type</p>
                    </Col>

                  </Row>
                  <Row>
                    <Col xs="12" xl="12">
                      <label style={styles.label} htmlFor="transit">Select transit type</label>
                      <Input id="transit" type="select" onChange={(e) => setTransit_type(e.target.value)}>
                        <option>Select a transit type</option>
                        {allVehicles && allVehicles.map(vehicle => (
                          <option key={vehicle._id} value={vehicle._id}>{vehicle.type.charAt().toUpperCase() + vehicle.type.slice(1)}</option>
                        ))}
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs="12" xl="12">
                      <label style={styles.label} htmlFor="base_fare">Base fare</label>
                      <Input value={baseFare} onChange={(e) => setBaseFare(e.target.value)} id="base_fare" type="text" />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs="12" xl="12">
                      <label style={styles.label} htmlFor="minimum">Minimum fare</label>
                      <Input value={minimumFare} onChange={(e) => setMinimumFare(e.target.value)} id="minimum" type="text" />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs="12" xl="12">
                      <label style={styles.label} htmlFor="per_distance">Amount per distance</label>
                      <Input value={amount} onChange={(e) => setAmount(e.target.value)} id="per_distance" type="text" />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs="12" xl="12">
                      {vehicles.updateVehicleLoading ? (
                        <div className="text-center">
                          <Spinner />
                        </div>
                      ) : (
                        <Button onClick={() => onUpdateVehicle()} style={styles.saveButton}>Save</Button>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            {isNewTransit ? (
              <Col xs="12" xl="4" className="form-container">
                <Card>
                  <CardBody>
                    <Row>
                      <Col xs="12" xl="6" className="close">
                        <span onClick={() => setNewTransit(false)} >X</span>
                      </Col>
                      <Col xs="12" xl="6">
                        <p style={styles.newText}>Add new transit type</p>
                      </Col>
                    </Row>
                    <Row className="mt-4 new-transit">
                      <Col xs="12" xl="12">
                        <label style={styles.label} htmlFor="transit_type">Transit type</label>
                        <Input onChange={(e) => setVehicleType(e.target.value)} id="transit_type" type="text" value={type} />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col xs="12" xl="12">
                        {vehicles.addLoading ? (
                          <div className="text-center">
                            <Spinner />
                          </div>
                        ) : (
                          <Button onClick={() => onAdd()} style={styles.saveButton}>Save</Button>
                        )}
                        
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ) : null}
          </Row>
        </>
      )}
     
      <Row>
        {isPolicy ? (
          <Modal
            visible={visible}
            title="Privacy Policy"
            onOk={() => handleOk()}
            onCancel={() => handleCancel()}
            footer={[
              <Button key="back" onClick={() => handleCancel()}>
                Return
              </Button>,
              policy.addLoading || policy.updateLoading ? (
                <div className="text-center">
                  <Spinner />
                </div>
              ) : (
                <Button key="submit" type="primary" onClick={() => onAddPolicy()}>
                  Submit
                </Button>
              )
              ,
            ]}
          >
            <Input value={data} onChange={(e) => setData(e.target.value)} type="textarea" />
          </Modal>
        ) : isTerm ? (
          <Modal
            visible={visible}
            title="Terms and Conditions"
            onOk={() => handleOk()}
            onCancel={() => handleCancel()}
            footer={[
              <Button key="back" onClick={() => handleCancel()}>
                Return
              </Button>,
              terms_condition.addLoading || terms_condition.updateLoading ? (
                <div className="text-center">
                  <Spinner />
                </div>
              ) : (
                <Button key="submit" type="primary" onClick={() => onAddTerm()}>
                  Submit
                </Button>
              )
              ,
            ]}
          >
            <Input value={termData} onChange={(e) => setTerm(e.target.value)} type="textarea" />
          </Modal>
        ) : null}
      </Row>

      <Row>
        {isPolicy ? (
          <Modal
            visible={isEdit}
            title="Edit Privacy Policy"
            onOk={() => closeModal()}
            onCancel={() => closeModal()}
            footer={[
              <Button key="back" onClick={() => closeModal()}>
                Return
              </Button>,
              policy.addLoading || policy.updateLoading ? (
                <div className="text-center">
                  <Spinner />
                </div>
              ) : (
                <Button key="submit" type="primary" onClick={() => onUpdatePolicy()}>
                  Submit
                </Button>
              )
              ,
            ]}
          >
            <Input value={data} onChange={(e) => setData(e.target.value)} type="textarea" />
          </Modal>
        ) : isTerm ? (
          <Modal
            visible={isEdit}
            title="Edit Terms and Conditions"
            onOk={() => closeModal()}
            onCancel={() => closeModal()}
            footer={[
              <Button key="back" onClick={() => closeModal()}>
                Return
              </Button>,
              terms_condition.addLoading || terms_condition.updateLoading ? (
                <div className="text-center">
                  <Spinner />
                </div>
              ) : (
                <Button key="submit" type="primary" onClick={() => onUpdateTerm()}>
                  Submit
                </Button>
              ),
            ]}
          >
            <Input value={termData} onChange={(e) => setTerm(e.target.value)} type="textarea" />
          </Modal>
        ) : null}
      </Row>
    </div>
  );
}

export default Settings;