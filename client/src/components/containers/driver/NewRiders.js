import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spinner, Table } from "reactstrap";
import { Tabs, Input, message, Button, Modal } from "antd";
import { getDrivers, activateDriver } from "../../../store/actions/driver";
import Paginations from "../../views/Pagination";
import Avatar from "../../../assets/user_avatar.jpg";
import { FilePdfOutlined, FilterOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const styles = {
  card_container: {
    backgroundColor: "#EDF5F882"
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "50%"
  },
  p: {
    borderTop: 0,
    borderTopWidth: 0,
    borderTopStyle: "none",
    borderTopColor: "",
    borderBottom: 0,
    borderBottomWidth: 0,
    borderBottomStyle: "none",
    borderBottomColor: "",
    fontSize: 11,
    padding: "2px"
  },
  button: {
    backgroundColor: "#26acd1",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "10px",
    height: "30px",
    marginBottom: "15px",
    marginRight: "10px",
    marginLeft: "15px",
  },
  h5: {
    marginTop: "-5px"
  },
  span: {
    color: "#26acd1",
    marginLeft: "15px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  searchWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  filterIcon: {
    fontSize: "18px",
    background: "#26acd1",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    marginRight: "5px"
  },
  spinner: {
    color: "#26acd1"
  }
}

const BASE_URL = process.env.REACT_APP_API_URL;

const NewRiders = () => {
  const dispatch = useDispatch();
  const riders = useSelector((state) => state.riderReducer);
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);
  const [ visible, setVisible ] = useState(false);
  const [ searchFilter, setSearchFilter ] = useState("");

  useEffect(() => {
    dispatch(getDrivers());
  }, [ dispatch ]);

  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  }

  useEffect(() => {
    if (riders.error && riders.error.length) {
      message.error(riders.error);
    } else if (riders.ridersSuccess === true) {
      const allRiders = riders.riders && riders.riders
      const filteredRiders = allRiders.filter(rider => rider.activated === false);
      setData(filteredRiders);
    }
  }, [ riders ]);

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onAccept = (id) => {
    dispatch(activateDriver(id));
  }

  const operations = <div style={styles.searchWrapper}>
      <FilterOutlined style={styles.filterIcon} /> 
      <Input placeholder="Search..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
    </div>;

  const filteredContents = data.filter(content => content.firstName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 || content.lastName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1);

  return (
    <div>
      <Row>
        <Col xs="12" xl="12">
        <Tabs tabBarExtraContent={operations}>
          <TabPane tab={data && data.length + " New riders"} key="1">
            <Row>
              {riders.ridersLoading ? 
              ( <div className="ml-5">
                  <Spinner style={styles.spinner} />
                </div>
                ) : filteredContents.length ? filteredContents.map(rider => (
                  <Col xs="12" xl="4" className="mt-2">
                    <Card style={styles.card_container} className="mb-3" draggable>
                      <Row className="mt-2 p-1">
                        <Col xs="12" xl="2">
                          <img
                            src={`${BASE_URL}/photo/${rider && rider.role}/${rider && rider._id}?${new Date().getTime()}`}
                            onError={(i) => i.target.src = `${Avatar}`}
                            alt="avatar"
                            style={styles.image}
                          />
                        </Col>
                        <Col xs="12" xl="10">
                          <h6 className="m-1"><strong>{rider && rider.firstName} {rider && rider.lastName}</strong></h6>
                          <Row className="m-1">
                            <Table responsive style={{ border: "none"}}>
                              <tbody>
                                <tr>
                                  <td style={styles.p}>Email address</td>
                                  <td style={styles.p}>{rider && rider.email ? rider.email : "No emaill address"}</td>
                                </tr>
                                <tr>
                                  <td style={styles.p}>Phone</td>
                                  <td style={styles.p}>{rider && rider.phone ? rider.phone : "No phone"}</td>
                                </tr>
                                <tr>
                                  <td style={styles.p}>Vehicle type</td>
                                  <td style={styles.p}>{rider.vehicleType ? rider.vehicleType.charAt(0).toUpperCase() + rider.vehicleType.slice(1) : "Pending update"}</td>
                                </tr>
                                <tr>
                                  <td style={styles.p}>Reg. number</td>
                                  <td style={styles.p}>{rider && rider.vehicleNumber ? rider.vehicleNumber : "Pending update"}</td>
                                </tr>
                                <tr>
                                  <td style={styles.p}>Model</td>
                                  <td style={styles.p}>{rider.vehicleModel ? rider.vehicleModel : "Pending update"}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="mr-2">
                        <Col xs="12" xl="6">
                          <span style={{ ...styles.span}} onClick={() => setVisible(true)}>
                            <FilePdfOutlined /> See documents</span>
                        </Col>
                        <Col xs="3" xl="6">
                          <Row className="mr-2">
                            <Col xs="6" xl="6">
                              {riders.activateLoading ? <Spinner /> : (
                                <Button style={{ ...styles.button }} onClick={() => onAccept(rider._id)}>Accept</Button>
                              )}
                            </Col>
                            <Col xs="6" xl="6">
                              <Button style={{ ...styles.button }}>Decline</Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col xs="12" xl="6">
                          <Modal
                            title="Rider's vehicle particulers"
                            visible={visible}
                            onOk={handleOk}
                            onCancel={() => handleCancel()}
                          >
                            <Row className="mt-3">
                              <Col xs="12" xl="12">
                                <img src={`${BASE_URL}/rider/insurance/photo/${rider && rider._id}?${new Date().getTime()}`} style={ styles.ifram } alt="driver license" /> 
                              </Col>
                            </Row>
                            <p>Vehicle insurance</p>
                            <hr />
                            <Row className="mt-3">
                              <Col xs="12" xl="12">
                                <img src={`${BASE_URL}/rider/license/photo/${rider && rider._id}?${new Date().getTime()}`} style={ styles.ifram } alt="driver license" /> 
                              </Col>
                            </Row>
                            <p>Driving license</p>
                            <hr />
                            <Row className="mt-3">
                              <Col xs="12" xl="12">
                                <img src={`${BASE_URL}/rider/vehicle/photo/${rider && rider._id}?${new Date().getTime()}`} style={ styles.ifram } alt="driver license" /> 
                              </Col>
                            </Row>
                            <p>Vehicle image</p>
                          </Modal>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                )) : pageOfItems.length ? pageOfItems.map(rider => (
                  <Col xs="12" xl="4" className="mt-2">
                    <Card style={styles.card_container} className="mb-3" draggable>
                      <Row className="mt-2 p-1">
                        <Col xs="12" xl="2">
                          <img
                            src={`${BASE_URL}/photo/${rider && rider.role}/${rider && rider._id}?${new Date().getTime()}`}
                            onError={(i) => i.target.src = `${Avatar}`}
                            alt="avatar"
                            style={styles.image}
                          />
                        </Col>
                        <Col xs="12" xl="10">
                          <h6 className="m-1"><strong>{rider && rider.firstName} {rider && rider.lastName}</strong></h6>
                          <Row className="m-1">
                            <Table responsive style={{ border: "none"}}>
                              <tbody>
                                <tr>
                                  <td style={styles.p}>Email address</td>
                                  <td style={styles.p}>{rider && rider.email ? rider.email : "No emaill address"}</td>
                                </tr>
                                <tr>
                                  <td style={styles.p}>Phone</td>
                                  <td style={styles.p}>{rider && rider.phone ? rider.phone : "No phone"}</td>
                                </tr>
                                <tr>
                                  <td style={styles.p}>Vehicle type</td>
                                  <td style={styles.p}>{rider.vehicleType ? rider.vehicleType.charAt(0).toUpperCase() + rider.vehicleType.slice(1) : "Pending update"}</td>
                                </tr>
                                <tr>
                                  <td style={styles.p}>Reg. number</td>
                                  <td style={styles.p}>{rider && rider.vehicleNumber ? rider.vehicleNumber : "Pending update"}</td>
                                </tr>
                                <tr>
                                  <td style={styles.p}>Model</td>
                                  <td style={styles.p}>{rider.vehicleModel ? rider.vehicleModel : "Pending update"}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="mr-2">
                        <Col xs="12" xl="6">
                          <span style={{ ...styles.span}} onClick={() => setVisible(true)}>
                            <FilePdfOutlined /> See documents</span>
                        </Col>
                        <Col xs="3" xl="6">
                          <Row className="mr-2">
                            <Col xs="6" xl="6">
                              {riders.activateLoading ? <Spinner /> : (
                                <Button style={{ ...styles.button }} onClick={() => onAccept(rider._id)}>Accept</Button>
                              )}
                            </Col>
                            <Col xs="6" xl="6">
                              <Button style={{ ...styles.button }}>Decline</Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col xs="12" xl="6">
                          <Modal
                            title="Rider's vehicle particulers"
                            visible={visible}
                            onOk={handleOk}
                            onCancel={() => handleCancel()}
                          >
                            <Row className="mt-3">
                              <Col xs="12" xl="12">
                                <img src={`${BASE_URL}/rider/insurance/photo/${rider && rider._id}?${new Date().getTime()}`} style={ styles.ifram } alt="driver license" /> 
                              </Col>
                            </Row>
                            <p>Vehicle insurance</p>
                            <hr />
                            <Row className="mt-3">
                              <Col xs="12" xl="12">
                                <img src={`${BASE_URL}/rider/license/photo/${rider && rider._id}?${new Date().getTime()}`} style={ styles.ifram } alt="driver license" /> 
                              </Col>
                            </Row>
                            <p>Driving license</p>
                            <hr />
                            <Row className="mt-3">
                              <Col xs="12" xl="12">
                                <img src={`${BASE_URL}/rider/vehicle/photo/${rider && rider._id}?${new Date().getTime()}`} style={ styles.ifram } alt="driver license" /> 
                              </Col>
                            </Row>
                            <p>Vehicle image</p>
                          </Modal>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                )) : <p>No records found</p>}
            </Row>
          </TabPane>
        </Tabs>
        {data && data.length > 0 ? (
          <Paginations items={data} onChangePage={onChangePage} />
        ) : null}
        </Col>
      </Row>
    </div>
  )
}

export default NewRiders;