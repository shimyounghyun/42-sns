import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/home/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route path="/" component={HomePage} exact />
  </Switch>
  </BrowserRouter>
  );
}

export default App;
