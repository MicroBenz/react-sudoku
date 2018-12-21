import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './features/home/home.page'
import BoardPage from './features/level/level.page'

export default () => (
  <Switch>
    <Route path="/levels/:levelId" component={BoardPage} />
    <Route path="/" component={HomePage} />
  </Switch>
)
