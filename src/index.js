import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import firebase from 'firebase'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Routes from './routes'
import reducer from './reducers'

import './index.css'

const store = createStore(reducer, applyMiddleware(thunk))

// init firebase
const config = {
  apiKey: "AIzaSyCALVkkWRd1uA6D-pKvatBzNA26dYu8uLU",
  authDomain: "moana-d6fc3.firebaseapp.com",
  databaseURL: "https://moana-d6fc3.firebaseio.com",
  storageBucket: "moana-d6fc3.appspot.com",
  messagingSenderId: "839380443808"
}
firebase.initializeApp(config)

// enable material-ui touch tap plugin
injectTapEventPlugin();

// bind material UI to app
const MaterialUIRoutes = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Routes history={browserHistory } />
    </Provider>
  </MuiThemeProvider>
)

ReactDOM.render(
  <MaterialUIRoutes />,
  document.getElementById('root')
);

store.subscribe(() => {
  console.log(store.getState())
})
