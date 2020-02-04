import {combineReducers} from 'redux';
import fuse from './fuse';
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import userReducer from '../../auth/store/reducers/index';
import myReducer from './animationReducers/myReducer'
import animateurReducer from './animateurReducers/animateurReducer'
import clientReducer from './clientReducers/clientReducer'
import réseauReducer from './réseauReducers/réseauReducer'
import magasinReducer from './magasinReducers/magasinReducer'
import produitReducer from './produitReducers/produitReducer'
import formationReducer from './formationReducers/formationReducer'
import infoReducer from './infoReducers/infoReducer'
import reducer from '../../main/profil/tabs/calendar/store/reducers/index'
import fileReducer from './uploadReducers/uploadReducer'
import marqueReducer from './marqueReducers/marqueReducer'
import messageReducer from './messageReducers/messageReducer'
import events from '../../main/profil/tabs/calendar/store/reducers/index'

const createReducer = (asyncReducers) =>
    combineReducers({
        auth: userReducer,
        fuse,
        quickPanel,
        ...asyncReducers,
        firestore: firestoreReducer,
        firebase: firebaseReducer,
        clientReducer,
        animateurReducer,
        myReducer,
        réseauReducer,
        magasinReducer,
        marqueReducer,
        produitReducer,
        formationReducer,
        messageReducer,
        fileReducer,
        infoReducer,
        reducer,
        events
    });

export default createReducer;
