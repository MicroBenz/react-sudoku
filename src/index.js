import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './index.css'
import reducers from './redux/reducers'
import * as serviceWorker from './serviceWorker'

import HomePage from './pages/Home'
import BoardPage from './pages/Board'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware()))
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/levels/:levelId" component={BoardPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
