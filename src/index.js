import './styles/index.css';
import 'babel-polyfill'
import 'typeface-muli';
import './react-table-defaults';
import './react-chartjs-2-defaults';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from 'app/App';

import {createFirestoreInstance} from 'redux-firestore';
import firebase from './app/firebase/fbConfig'
import store from './app/store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';


const rrfProps = {
    firebase,
    config: {},
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
 }
 
 const render = () => {
    ReactDOM.render(
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App/>
        </ReactReduxFirebaseProvider>,
        document.getElementById('root')
    );
};

window.onload = () => {
    render();
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
