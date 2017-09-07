import {createStore, applyMiddleware} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {hashHistory} from 'react-router';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import rootReducer from '../reducers/RootReducer';
dsdsdsds
const defaultState = {};dsdsdsd

const store = createStore(rootReducer, defaultState, applyMiddleware(logger(),thunk,promise()));

export const history = syncHistoryWithStore(hashHistory, store);

export default store;dsdsds