import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Input, message, Button } from 'antd';
import Rider from "./Rider";
import { getDrivers, addDriver, updateDriver } from "../../../store/actions/driver";
import { FilterOutlined } from "@ant-design/icons";
import { Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, Spinner } from "reactstrap";

const { TabPane } = Tabs;

const styles = {
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
  button: {
    background: "#26acd1",
    border: "none",
    float: "right",
    color: "#fff"
  },
  imageName: {
    background: "#caf0f8",
    padding: "5px",
    borderRadius: "5px",
    width: "100%"
  },
  header: {
    color: "#26acd1 !important"
  },
  spinner: {
    color: "#26acd1"
  }
}

const Driver = ({ match }) => {
  const dispatch = useDispatch();
  const riders = useSelector((state) => state.riderReducer);
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);
  const [ searchFilter, setSearchFilter ] = useState("");
  const [ modal, setModal] = useState(false);
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ vehicleType, setVehicleType ] = useState("");
  const [ vehicleNumber, setVehicleNumber ] = useState("");
  const [ model, setModel ] = useState("");
  const [ riderPhoto, setImageUrl ] = useState({});
  const [ license, setLicense ] = useState({});
  const [ insurance, setInsurance ] = useState({});
  const [ vehicleImage, setVehicleImage ] = useState({});
  const [ riderId, setRiderId ] = useState("");
  
  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getDrivers());
  }, [ dispatch ]);

  const onChangePage = (pageOfItems) => {
    // update state with new page of items
    setPageOfItems(pageOfItems);
  }

  useEffect(() => {
    if (riders.error && riders.error.length) {
      message.error(riders.error);
    } else if (riders.ridersSuccess === true) {
      setData(riders.riders);
    }
  }, [ riders ]);

  useEffect(() => {
    if (!firstName || !lastName || !email || !phone || !password) {
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      phone,
      password,
      role: "rider",
    }

    dispatch(addDriver(data));
  }, [ vehicleImage ]);

  useEffect(() => {
    if (riders.createSuccess) {
      const id = riders.rider && riders.rider.doc && riders.rider.doc._id;
      setRiderId(id)
    }
  }, [ riders ]);

  const onUpdate = () => {
    const data = { vehicleImage, vehicleType, vehicleNumber, model, license,insurance, riderPhoto}
    dispatch(updateDriver(data, riderId));
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setVehicleType("");
    setModel("");
  }

  const riderList = riders.riders && riders.riders;

  const operations = <div style={styles.searchWrapper}>
      <FilterOutlined style={styles.filterIcon} /> 
      <Input placeholder="Search..." value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
    </div>;

  const filteredContents = pageOfItems.filter(content => content.firstName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 || content.lastName.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1);

  return (
    <div>
      <Row>
        <Col xs="10" xl="10"></Col>
        <Col xs="2" xl="2">
          <Button onClick={() => toggle(true)} style={styles.button}>Add new driver</Button>
        </Col>
      </Row>
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab={riderList && riderList.length + " Riders"} key="1">
          <Rider 
            riders={riders} 
            data={data} 
            filteredContents={filteredContents}
            onChangePage={onChangePage} 
            pageOfItems={pageOfItems}
            match={match}
          />
        </TabPane>
      </Tabs>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} style={styles.header}>Add new driver</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="">First name
                  <Input type="text" onChange={(e) => setFirstName(e.target.value)} />
                </label>
              </Col>
              <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="lastName">Last name
                  <Input type="text" id="lastName" onChange={(e) => setLastName(e.target.value)} />
                </label>
              </Col>
            </Row>
            <Row>
              <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="email">Email
                  <Input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
              </Col>
              <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="phone">Phone
                  <Input type="text" id="phone" onChange={(e) => setPhone(e.target.value)} />
                </label>
              </Col>
            </Row>
            <Row>
              <Col xs="12" xl="6" xl="6" className="mt-3">
                <label htmlFor="password">Password
                  <Input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
              </Col>
              <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="vehicleType">Vehicle type
                  <Input type="text" id="vehicleType" onChange={(e) => setVehicleType(e.target.value)} />
                </label>
              </Col>
            </Row>
            <Row>
              <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="model">Model
                  <Input type="text" id="model" onChange={(e) => setModel(e.target.value)} />
                </label>
             </Col>
             <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="vehicleNumber">Vehicle number
                  <Input type="text" id="vehicleNumber" onChange={(e) => setVehicleNumber(e.target.value)} />
                </label>
             </Col>
           </Row>
           <Row>
              <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="imageUrl">Upload driving license</label><br />
                <div className="upload-btn-wrapper">
                  <button className="btn">Choose a file</button>
                  <input type="file" id="license" onChange={(e) => setLicense(e.target.files[0])} />
                </div>
                {license && license.name ? <span style={styles.imageName}>{license && license.name}</span> : null}
             </Col>
             <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="imageUrl">Upload vehicle photo</label><br />
                <div className="upload-btn-wrapper">
                  <button className="btn">Choose a file</button>
                  <input type="file" onChange={(e) => setVehicleImage(e.target.files[0])} />
                </div>
                {vehicleImage && vehicleImage.name ? <span style={styles.imageName}>{vehicleImage && vehicleImage.name}</span> : null}
              </Col>
            </Row>
            <Row>
              <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="insurance">Upload vehicle insurance</label><br />
                <div className="upload-btn-wrapper">
                  <button className="btn">Choose a file</button>
                  <input type="file" id="insurance" onChange={(e) => setInsurance(e.target.files[0])} />
                </div>
                {insurance && insurance.name ? <span style={styles.imageName}>{insurance && insurance.name}</span> : null}
              </Col>
              <Col xs="12" xl="6" className="mt-3">
                <label htmlFor="imageUrl">Upload driver photo</label><br />
                <div className="upload-btn-wrapper">
                  <button className="btn">Choose a file</button>
                  <input type="file" id="imageUrl" onChange={(e) => setImageUrl(e.target.files[0])} />
                </div>
                {riderPhoto && riderPhoto.name ? <span style={styles.imageName}>{riderPhoto && riderPhoto.name}</span> : null}
              </Col>
           </Row>
          </ModalBody>
          <ModalFooter>
            {riders.updateLoading ? (
              <div className="text-center">
                <Spinner style={styles.spinner} />
              </div>
            ) : (
              <Button style={styles.button} color="primary" onClick={onUpdate}>Submit</Button>
            )}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Driver;