import { combineReducers } from "redux";
import { authReducer } from "./authentication";
import { orderReducer } from "./order";
import { riderReducer } from "./rider";
import { customerReducer } from "./customer";
import { notificationReducer } from "./notification";
import { earningReducer } from "./earning/earning";
import { vehicleReducer } from "./vehicle";
import { termsReducer } from "./terms&conditions";
import { policyReducer } from "./privacyPolicy";
import { priceReducer } from "./calculator";

export const rootReducer = combineReducers({
  authReducer,
  orderReducer,
  riderReducer,
  customerReducer,
  notificationReducer,
  earningReducer,
  vehicleReducer,
  termsReducer,
  policyReducer,
  priceReducer,
});