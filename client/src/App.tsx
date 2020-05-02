import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Core from './containers/base/Core';
import LoadingPage from './pages/LoadingPage';
import RegisterPage from './pages/RegisterPage';

// Core : 모달팝업 / 배경 레이어 ..
function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/auth" component={LoadingPage}/>
        <Route path="/regist" component={RegisterPage}/>
      </Switch>
      <Core/>
    </>
  );
}

export default App;
