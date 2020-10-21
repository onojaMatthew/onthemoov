import React, { useState, useEffect } from "react";
import { localAuth } from "../../../helper/authentcate";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Col, Row, Input, Spinner } from "reactstrap";
import { Button, message } from "antd";
import { createOrder, updateOrder } from "../../../store/actions/order";
import { calculatePrice } from "../../../store/actions/calculator";
import LocationSearchInput from "../../views/PlacesSearch";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
    color: "#fff"
  },
  amount: {
    // background: "#26ad1",
    padding: "10px"
  },
  moreAddr: {
    color: "#26ACD1",
    cursor: "pointer"
  },
  spinner: {
    color: "#26ACD1"
  },
  placeSearch: {
    width: "100%",
  }
}

const Book = () => {
  const [ deliveryAddress, setDeliveryAddress ] = useState([{ address: "", receiverPhone: "", receiver: "" }]);
  const [pickupLocation, setPickupLocation ] = useState("");
  const [ terms, setTerms ] = useState(false);
  const [ vehicleType, setVehicleType ] = useState("");
  const [ packageDescription, setPackageDiscription ] = useState("");
  const [ payer, setPayer ] = useState("");
  const [ orderId, setOrderId ] = useState("");
  const [ cost, setCost ] = useState(0);
  const [ pickupLat, setPickupLat] = useState("");
  const [ pickupLong, setPickupLong ] = useState("");
  // const [ coordinate, setCoordinates ] = useState([])
  const [ totalCost, setTotalCost ] = useState(0);
  const dispatch = useDispatch();
  const adminId = localAuth().user && localAuth().user._id;
  const orders = useSelector((state) => state.orderReducer);
  const price = useSelector((state) => state.priceReducer);
  const coordinates = useSelector((state) => state.priceReducer.results.results);

  const onDataChange = (index, event) => {
    const newUserData = [ ...deliveryAddress ];
    newUserData[ index ][ event.target.name ] = event.target.value;
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
    if (payer) {
      dispatch(createOrder())
    }
  }, [ payer, dispatch ]);

  useEffect(() => {
    if (orders.createSuccess) {
      setOrderId(orders.orders[0].orderId)
    }
  }, [ orders.createSuccess ]);

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
    if (price.success) {
      setCost(price.cost && price.cost.price)
    }
  }, [ price ]);

  useEffect(() => {
    const pickpLatitude = coordinates && coordinates[0] && coordinates[0].geometry && coordinates[0].geometry.location && coordinates[0].geometry.location.lat;
    const pickupLongitude = coordinates && coordinates[0] && coordinates[0].geometry && coordinates[0].geometry.location && coordinates[0].geometry.location.lng;
    
    setPickupLat(pickpLatitude);
    setPickupLong(pickupLongitude);
  }, [ coordinates ]);

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
      senderId: adminId,
      orderId,
      pickupLat,
      pickupLong,
      cost,
    }

    dispatch(updateOrder(data));
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

  const onCoordinates = (coords) => {
    setPickupLat(coords.lat);
    setPickupLong(coords.lng);
    let coordinate = [...coordinates];
    coordinate.push(coords);
    // setCoordinates(coordinate);
  };

  const onAddressChange = (address, name, index) => {
    const newUserData = [ ...deliveryAddress ];
    newUserData[ index ][ name ] = address;
    setDeliveryAddress(newUserData);
  }
  
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

  const handleSelect = (address, name, index) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log(latLng))
      .catch(error => console.error('Error', error));
      onAddressChange(address, name, index);
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" xl="10">
          <Card>
            <CardHeader>
              <Row>
                <Col xs="12" xl="6">
                  <h5 style={styles.headers}>Request delivery</h5>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row style={styles.pickupBorder} className="mb-4">
                <Col xs="12" xl="6">
                  <h6 style={styles.headers}>Pickup</h6>
                </Col>
                <Col xs="12" xl="6">
                  <h5 style={{float: "right"}}>Pickup</h5>
                </Col>
              </Row>
              <Row>
                <Col xs="12" xl="12">
                  <LocationSearchInput address={pickupLocation} handleLatLong={onCoordinates} handleAddress={setPickupLocation} />
                </Col>
              </Row>

              {deliveryAddress.map((data, index) => (
                <div key={index + 1}>
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
              ))}
              
              <Row className="mt-2">
                <Col xs="9" xl="9"></Col>
                <Col onClick={() => addNewData()} xs="3" xl="3" style={styles.moreAddr}>Add more addresses</Col>
              </Row>
              <Row className="mt-4">
                <Col xs="12" xl="2">
                  <p>Vehicle:</p>
                </Col>
                <Col style={{ display: "flex"}} xs="12" xl="10" className="vehicle-container">
                  <label className="mr-5">
                    <Input type="radio" onChange={(e) => onInputChange(e)} value="byke"  name="vehicle" /> Bike
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

              <Row className="mb-4 mt-4 justify-content-center">
                <Col xs="12" xl="6" className="cost-container">
                  {price.loading ? (
                    <div className="text-center">
                      <Spinner />
                    </div>
                  ) : <h6>&#8358; {totalCost && totalCost.toFixed(2)}</h6>}
                  
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

              <Row className="mt-4">
                <Col xs="3" xl="2">
                  <p>Payer:</p>
                </Col>
                <Col xs="9" xl="10">
                  <label className="mr-5">
                    <Input value="sender" onChange={(e) => setPayer(e.target.value)} type="radio" name="payer" /> Sender
                  </label>
                  <label className="mr-5">
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

              <Row className="mt-4">
                <Col xs="12" xl="12">
                  {orders.updateLoading ? (
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
        </Col>
      </Row>
    </div>
  );
}

export default Book;

// {
//   address: eachAddress.address,
//   receiver: eachAddress.receiver,
//   receiverPhone: eachAddress.receiverPhone,
//   packageId: eachAddress.packageId,
//   packageDescription: eachAddress.packageDescription
// }