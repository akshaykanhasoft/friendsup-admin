import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import Store from '../src/store/store'
import App from './app';
import "./assets/css/material-dashboard-react.css?v=1.6.0";

const app = (
  <Provider store={Store} >
      <App />
  </Provider >
);




ReactDOM.render(app, document.getElementById('root'));