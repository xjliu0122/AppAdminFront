import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import routes from './routes';
// redux
import store, {history} from './store/Store'
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
  <Router routes={routes} history={history}/>
</Provider>, document.getElementById('root'));
