import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwt from 'jsonwebtoken'

// Redux
import { store } from './shared/utils/redux'
import { Provider as ReduxProvider } from 'react-redux'
import { setCurrentUser } from './actions/user'

// Apollo Client
import { ApolloProvider } from 'react-apollo'
import { client } from './shared/utils/apollo'

// Import Components
import HomeContainer from './components/HomeContainer.jsx'
import Navigation from './components/Navigation.jsx'
import LoginContainer from './components/LoginContainer.jsx'
import SignupContainer from './components/SignupContainer.jsx'
import UserProfileContainer from './components/UserProfileContainer.jsx'

if(localStorage.jwtToken) {
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

class Routes extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <Fragment>
              <Navigation />
              <Switch>
                <Route exact path='/' component={HomeContainer} />
                <Route path='/login' component={LoginContainer} />
                <Route path='/signup' component={SignupContainer} />
                <Route path='/user/*' component={UserProfileContainer} />
                <Route path='/*' render={() => <h1>404 lol</h1>} />
              </Switch>
            </Fragment>
          </Router>
        </ApolloProvider>
      </ReduxProvider>
    )
  }
}

export default Routes