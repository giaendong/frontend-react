import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import configureStore from './config/store';

import 'bootstrap/dist/css/bootstrap.css';
// jquery and popperjs below needed to support bootstrap
// import $ from 'jquery'; // eslint-disable-line
// import Popper from 'popper.js'; // eslint-disable-line
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './views/css/layout.css';

const store = configureStore().store;

// pass our store into our Provider
ReactDOM.render(
    // Provider pass data into our App
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
