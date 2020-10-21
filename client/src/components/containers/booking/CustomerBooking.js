import React, { useState, useEffect, useContext } from "react";
import { localAuth } from "../../../helper/authentcate";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Col, Row, Input, Spinner, Container } from "reactstrap";
import { Button, message } from "antd";
import { customerOrder } from "../../../store/actions/order";
import { calculatePrice } from "../../../store/actions/calculator";
import MapWrapper from "../../views/MapWrapper";
import LocationSearchInput from "../../views/PlacesSearch";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { MapContext } from "../../../context/MapContext";

const styles = {
  pickupBorder: {
    borderBottom: "thin solid rgb(204, 204, 204)",
    marginBottom: ""
  },
  headers: {
    color: "#26ACD1"
  },
  button: {
    width: "100%",
    background: "#26ACD1",
    borderRadius: "5px",
    color: "#fff",
  },
  amount: {
    padding: "10px"
  },
  moreAddr: {
    color: "#26ACD1",
    cursor: "pointer"
  },
  spinner: {
    color: "#26ACD1"
  },
  orderButton: {
    borderRadius: "20px",
    background: "#26ACD1",
    float: "right",
    width: "100%",
    marginBottom: "15px",
    marginTop: "15px",
    color: "#fff",
    height: "40px"
  },
  cardHeader: {
    backgroundColor: "none"
  },
  flex: {
    display: "flex",
    fontWeight: "bold"
  },
  tab: {
    cursor: "pointer"
  },
  placeSearch: {
    width: "100%",
  }
}

const CustomerBooking = () => {
  const [ deliveryAddress, setDeliveryAddress ] = useState([{ address: "", receiverPhone: "", receiver: "" }]);
  const [pickupLocation, setPickupLocation ] = useState("");
  const [ terms, setTerms ] = useState(false);
  const [ senderName, setSenderName ] = useState("");
  const [ senderPhone, setSenderPhone ] = useState("");
  const [ vehicleType, setVehicleType ] = useState("");
  const [ packageDescription, setPackageDiscription ] = useState("");
  const [ payer, setPayer ] = useState("");
  const [ orderId, setOrderId ] = useState("");
  const [ cost, setCost ] = useState(0);
  const [ pickupLat, setPickupLat] = useState("");
  const [ pickupLong, setPickupLong ] = useState("");
  const [ totalCost, setTotalCost ] = useState(0);
  const [ coordinates, setCoordinates ] = useState([]);
  const dispatch = useDispatch();
  const senderId = localAuth().user && localAuth().user._id;
  const orders = useSelector((state) => state.orderReducer);
  const price = useSelector((state) => state.priceReducer);

  const { setCoord8s, setCount, count } = useContext(MapContext);

  const onDataChange = (index, event) => {
    const newUserData = [ ...deliveryAddress ];
    newUserData[ index ][ event.target.name ] = event.target.value;
    setDeliveryAddress(newUserData);
  }

  const onAddressChange = (address, name, index) => {
    const newUserData = [ ...deliveryAddress ];
    newUserData[ index ][ name ] = address;
    setDeliveryAddress(newUserData);
  }

  const addNewData = () => {
    const newData = [ ...deliveryAddress ];
    newData.push( { receiver: "", address: "", receiverPhone: "" });
    setDeliveryAddress(newData);
  }

  const onInputChange = (e) => {
    setVehicleType(e.target.value);
  };

  useEffect(() => {
    const token = localAuth().token && localAuth().token;
    if (!token) {
      window.location.href = "/signin";
    }
  }, []);

  useEffect(() => {
    if (orders.customerorderSuccess === true) {
      message.success("Your request was sent successfully");
      setTimeout(() => {
        window.location.href = "/customer_booking/request_history";
      }, 2000);
    }
  }, [ orders ]);

  useEffect(() => {
    let destinations = [];
    const origin = new Array(pickupLocation);
    for (let i = 0; i < deliveryAddress.length; i++) {
      let eachAddress = deliveryAddress[i];
      destinations.push(eachAddress.address);
    }

    const data = { destinations, origin, vehicleType: vehicleType };
    dispatch(calculatePrice(data));
  }, [ vehicleType ]);

  useEffect(() => {
    let destinations = [];
    const origin = new Array(pickupLocation);
    for (let i = 0; i < deliveryAddress.length; i++) {
      let eachAddress = deliveryAddress[i];
      destinations.push(eachAddress.address);
    }

    const data = { destinations, origin, vehicleType: vehicleType };
    if (vehicleType) {
      dispatch(calculatePrice(data));
    }
    
  }, [ deliveryAddress ]);

  useEffect(() => {
    if (price.success) {
      setCost(price.cost && price.cost.price);
    }
  }, [ price ]);

  const onCoordinates = (coords) => {
    setPickupLat(coords.lat);
    setPickupLong(coords.lng);
    let coordinate = [...coordinates];
    coordinate.push(coords);
    setCoordinates(coordinate);
  };

  const onDestCoord = (coords) => {
    let coordinate = [...coordinates];
    coordinate.push(coords);
    setCoordinates(coordinate);
  };

  useEffect(() => {
    if (orders.error) {
      message.error(orders.error);
    }
  }, [ orders.error ]);
  
  const onSubmit = () => {
    const data = {
      deliveryAddress,
      payer,
      pickupLocation,
      vehicleType,
      packageDescription,
      senderId,
      orderId,
      pickupLat,
      pickupLong,
      cost: totalCost,
      senderName,
      senderPhone
    }

    dispatch(customerOrder(data));
  }

  useEffect(() => {
    if (orders.createSuccess) {
      setVehicleType("");
      setPayer("");
      setCost(0);
      setPackageDiscription("");
    }
  }, [ orders.updateSuccess ]);

  useEffect(() => {
    const vat = 0.07 * cost;
    const newCost = cost + vat;
    setTotalCost(newCost);
  }, [ cost ]);

  const handleSelect = (address, name, index) => { 
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => onDestCoord(latLng))
      .catch(error => console.error('Error', error));

    onAddressChange(address, name, index);
  };

  const onRemove = (index) => {
    let newDeliveryAddr = [...deliveryAddress];
    let coordinate = [...coordinates];

    coordinate.splice(index, 1);
    setCoordinates(coordinate);
    setCoord8s(coordinate);
    setCount(count + 1);
    newDeliveryAddr.splice(index, 1);
    setDeliveryAddress(newDeliveryAddr);
  }

  return (
    <div style={{ background: "#edeff2", minHeight: "99vh" }}>
      <Container>
        <Row>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader style={styles.cardHeader}>
                <Row style={styles.pickupBorder} className="mb-4">
                  <Col xs="12" xl="6">
                    <h5 style={styles.headers}>Pick-up address</h5>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {/*  */}
                <Row>
                  <Col xs="12" xl="12">
                    <LocationSearchInput address={pickupLocation} handleLatLong={onCoordinates} handleAddress={setPickupLocation} />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col xs="12" xl="6">
                    <Input onChange={(e) => setSenderName(e.target.value)} type="text" name="sender" value={senderName} placeholder="Full name" />
                  </Col>
                  <Col xs="12" xl="6">
                    <Input onChange={(e) => setSenderPhone(e.target.value)} type="text" name="senderPhone" value={senderPhone} placeholder="Sender Tel" />
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {deliveryAddress.map((data, index) => (
              <Card className="mt-4" key={index + 1}>
                <CardHeader style={styles.cardHeader}>
                  <Row>
                    <Col xs="12" xl="6">
                      <h5 style={styles.headers}>Drop-off address</h5>
                    </Col>
                    <Col xs="12" xl="6">
                      <h5 onClick={() => onRemove(index)} style={{ 
                          float: "right",
                          cursor: "pointer"
                        }}>X</h5>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12" xl="12">
                      <div >
                        <Row className="mt-4">
                          <Col xs="12" xl="12">
                            <PlacesAutocomplete
                              value={data.address}
                              onChange={(e) => onAddressChange(e, "address",index)}
                              onSelect={(e) => handleSelect(e, "address", index)}
                              style={styles.container}
                            >
                              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                  <input
                                    style={styles.placeSearch}
                                    {...getInputProps({
                                      placeholder: 'Search Places ...',
                                      className: 'location-search-input',
                                    })}
                                  />
                                  <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                      const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                      // inline style for demonstration purpose
                                      const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                      return (
                                        <div
                                          {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                          })}
                                        >
                                          <span>{suggestion.description}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </PlacesAutocomplete>

                          </Col>
                        </Row>
                        <Row className="mt-4">
                          <Col xs="12" xl="6">
                            <Input onChange={(e) => onDataChange(index, e)} type="text" name="receiver" value={data.receiver} placeholder="Recipient Name" />
                          </Col>
                          <Col xs="12" xl="6">
                            <Input onChange={(e) => onDataChange(index, e)} type="text" name="receiverPhone" value={data.receiverPhone} placeholder="Recipient Tel" />
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))}

            <Row className="mt-2">
              <Col xs="6" xl="7"></Col>
              <Col onClick={() => addNewData()} xs="6" xl="5" style={styles.moreAddr}>
                <Button style={{ float: "right", marginTop: "10px" }}>Add more addresses</Button>
              </Col>
            </Row>

            <Card className="mt-4 mb-5"> 
              <CardBody>
                <Row className="mt-4">
                  <Col xs="12" xl="2">
                    <p>Vehicle:</p>
                  </Col>
                  <Col xs="12" xl="10" style={{ display: "flex"}} className="vehicle-container">
                    <label className="mr-5">
                      <Input type="radio" onChange={(e) => onInputChange(e)} value="bike"  name="vehicle" /> Bike
                    </label>
                    <label className="mr-5">
                      <Input type="radio" onChange={(e) => onInputChange(e)} value="car" name="vehicle" /> Car
                    </label>
                    <label className="mr-5">
                      <Input type="radio" onChange={(e) => onInputChange(e)} value="van" name="vehicle" /> Van
                    </label>
                    <label className="mr-5">
                      <Input value="truck" onChange={(e) => onInputChange(e)} type="radio" name="vehicle" /> Truck
                    </label>
                  </Col>
                </Row>

                <Row style={styles.pickupBorder} className="mb-4 mt-4">
                  <Col xs="12" xl="6">
                    <h6 style={styles.headers}>Parcel</h6>
                  </Col>
                  
                </Row>

                <Row className="mt-4">
                  <Col xs="12" xl="12">
                    <Input value={packageDescription} onChange={(e) => setPackageDiscription(e.target.value)} type="textarea" placeholder="Additional notes here..." />
                  </Col>
                </Row>

                <Row className="mt-4 ml-3">
                  <Col xs="3" xl="2">
                    <p>Payer:</p>
                  </Col>
                  <Col xs="9" xl="10">
                    <label className="mr-4">
                      <Input value="sender" onChange={(e) => setPayer(e.target.value)} type="radio" name="payer" /> Sender
                    </label>
                    <label className="mr-4">
                      <Input value="receiver" onChange={(e) => setPayer(e.target.value)} type="radio" name="payer" /> Reciever
                    </label>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col xs="12" xl="10">
                    <label className="ml-4">
                      <Input onChange={(e) => setTerms(e.target.checked)} type="checkbox" name="terms_and_conditions" /> By clicking "Place Request" you agree to our Terms of Use and Privacy Policy
                    </label>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" xl="6">
            <MapWrapper defaultZoom={14} places={coordinates} defaultCenter={{ lat: 6.465422, lng: 3.406448 }} />
          </Col>
        </Row>
      </Container>

      <Card className="price-card">
        <CardBody>
          <Row>
            <Col xs="6" xl="8">
              {price.loading ? (
                <div className="text-center">
                  <Spinner />
                </div>
              ) : <p>Cost(incl. vat): &#8358; {totalCost.toFixed(2)}</p>}
            </Col>
            <Col xs="6" xl="4">
              {orders.customerorderLoading ? (
                <div className="text-center">
                  <Spinner style={styles.spinner} />
                </div>
              ) : (
                <Button 
                  onClick={() => onSubmit()} 
                  disabled={!terms} 
                  style={styles.button}
                >
                  Place Request
                </Button>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default CustomerBooking;
