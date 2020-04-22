import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import rootReducer from './modules';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

// 리덕스 적용을 위해 가장 먼저 store생성 후 rootReducer를 넣어준다. 그 외의 인자는 log 확인을 위함
const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__
);

// Provider : 리덕스 적용을 의해 react-redux에서 제공, store를 props로 전달해주어야한다.
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);