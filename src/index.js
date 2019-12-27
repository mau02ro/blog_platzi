import React from 'react';
import ReactDOM from 'react-dom';


import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
//reducers
import reducers from './reducers';

import './index.css';
import './Components/css/iconos.css';
import App from './Components/App';


const store = createStore(
    reducers,//son todos los reducers de mi aplicacion
    {},//estado inicial
    applyMiddleware(reduxThunk)
);


ReactDOM.render(
    <Provider store={ store } >
        <App />
    </Provider>
    , document.getElementById('root'));


