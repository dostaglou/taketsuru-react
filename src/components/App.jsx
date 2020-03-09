import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import '../styles/App.css'
import '../styles/App.css'
import Login from './BaseViews/Login'
import MainPage from './MainPage';
import Shipments from './BaseViews/Shipments';
import { AUTH_TOKEN } from '../constants';
import Navigation from './Navigation'
import Profile from './BaseViews/Profile'

class App extends Component {
  state = {
    loggedIn: localStorage.getItem(AUTH_TOKEN),
  }
  render() {
    const {loggedIn} = this.state
    return (
      <div className="center w85">
        <div className="ph3 pv1 background-gray">
          <Navigation loggedIn={loggedIn} logout={this._logout} />
          <Switch>
            <Route exact path="/" render={() => {
              if (localStorage.getItem(AUTH_TOKEN)){
                return <Redirect to="/mainpage" />
              }
              return <Redirect to="/Login" component={Login} />
              }} />
            <Route exact path="/login"
                  render={(props) => <Login {...props} confirmation={this._loginConfirmation} />}
            />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/mainpage" component={MainPage} />
            <Route exact path="/shipments" component={Shipments} />
          </Switch>
        </div>
      </div>
    )
  }

  _loginConfirmation = (auth, token) => {
    localStorage.setItem(auth, token)
    if (localStorage.getItem(auth)){
      this.setState(() => {
        return {loggedIn: true}
      })
    }
  }

  _logout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    if (!localStorage.getItem(AUTH_TOKEN)) {
      this.setState(() => {
        return {loggedIn: false}
      })
    }
  }
}

export default App;
