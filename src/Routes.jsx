import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Import Components
import HomeContainer from './components/HomeContainer.jsx'
import Navigation from './components/Navigation.jsx'
import LoginContainer from './components/LoginContainer.jsx'
import SignupContainer from './components/SignupContainer.jsx'
import UserProfileContainer from './components/UserProfileContainer.jsx'

class Routes extends Component {
  render() {
    return (
      <Router>
        <span>
          <Navigation />       
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route path='/login' component={LoginContainer} />
            <Route path='/signup' component={SignupContainer} />
            <Route path='/user/*' component={UserProfileContainer} />
            <Route path='/*' render={() => <h1>404 lol</h1>} />
          </Switch>
        </span>
      </Router>
    )
  }
}

export default Routes