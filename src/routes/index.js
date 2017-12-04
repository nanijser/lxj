import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'

import Home from 'views/Home/page'
import Icon from 'views/IconDoc/page'

export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="鲁小姐">
        <IndexRoute component={Home} name="首页"/>
        <Route path='/Home' component={Home} name="首页" />
        <Route path='/Icon' component={Icon} name="Icon" />
      </Route>
    </Router>
  )
}
