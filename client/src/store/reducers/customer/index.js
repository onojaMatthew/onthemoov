import {
  GET_CUSTOMERS_START,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILED,
  GET_CUSTOMER_START,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILED,
  DELETE_CUSTOMER_START,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILED
} from "../../actions/customer";

const initialState = {
  customers: [],
  customer: {},
  customerLoading: false,
  customerSuccess: false,
  customersLoading: false,
  customersSuccess: false,
  deleteCustomerLoading: false,
  deleteCustomerSuccess: false,
  error: ""
}

export const customerReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_CUSTOMERS_START:
      return {
        ...state,
        customersLoading: true,
      }
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customersLoading: false,
        customersSuccess: true,
        customers: action.data,
      }
    case GET_CUSTOMERS_FAILED:
      return {
        ...state,
        customersLoading: false,
        customersSuccess: false,
        error: action.error
      }
    case GET_CUSTOMER_START:
      return {
        ...state,
        customerLoading: true,
      }
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        customerLoading: false,
        customerSuccess: true,
        customers: action.data,
      }
    case GET_CUSTOMER_FAILED:
      return {
        ...state,
        customerLoading: false,
        customerSuccess: false,
        error: action.error
      }
    case DELETE_CUSTOMER_START:
      return {
        ...state,
        deleteCustomerLoading: true,
      }
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        deleteCustomerLoading: false,
        deleteCustomerSuccess: true,
        customers: state.customers.filter(customers => customers._id !== action.data.customerId),
      }
    case DELETE_CUSTOMER_FAILED:
      return {
        ...state,
        deleteCustomerLoading: false,
        deleteCustomerSuccess: false,
        error: action.error
      }
    default: 
      return state
  }
}