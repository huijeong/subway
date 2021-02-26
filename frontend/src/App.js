//frontend/src/App.js

import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {Component, Fragment, useState, useEffect} from 'react';
import { useRoutes , BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import routes from './routes';
import { Provider , useSelector} from 'react-redux';
import { store, persistor } from './store';
import {loadUser} from './actions/auth'
// import PrivateRoute from './PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react'

const App = (props) => {
  // store.dispatch(loadUser);
  const { auth } = useSelector((state) => state);
  let routing = useRoutes(routes(auth));
  console.log('App.js', routing)
  useEffect(()=>{
    store.dispatch(loadUser);
  }, []);
  console.log('App.js', 'auth', auth, localStorage.getItem("token"));
  

  return (    
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
  );
};

const AppWrapper = (pros) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App/>
        </Router>
      </PersistGate>
    </Provider>
  )
}
export default AppWrapper;
