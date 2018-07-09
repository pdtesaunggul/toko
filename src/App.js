import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import User from './pages/User'
import UserDashboard from './pages/UserDashboard'
import UserDashboardDetail from './pages/UserDashboardDetail'
import AdminProduct from './pages/AdminProduct'
import AdminUser from './pages/AdminUser'
import Kasir from './pages/Kasir'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={User} />
          <Route path="/users" component={UserDashboard} />
          <Route path="/user/:id" component={UserDashboardDetail} />
          <Redirect exact from="/admin" to="/admin/role" />
          <Route exact path="/admin/role" component={AdminUser} />
          <Route exact path="/admin/produk" component={AdminProduct} />
          <Route exact path="/kasir" component={Kasir} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
