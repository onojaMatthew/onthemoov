import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { rootReducer } from "./store/reducers";
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import './index.css';
import App from './components/App';

let store;
if (process.env.REACT_APP_ENV === "development") {
  store = createStore( rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
} else if (process.env.REACT_APP_ENV === "production") {
  store  = createStore( rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
