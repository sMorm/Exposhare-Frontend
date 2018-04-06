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
import Chat from './components/Chat/Chat.jsx'
import EditZone from './components/Upload/EditZone.jsx'
import GetStarted from './components/GetStarted/GetStarted.jsx'
import Home from './components/Home/Home.jsx'
import Login from './components/Login/Login.jsx'
import Navigation from './components/Navigation/Navigation.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import Search from './components/Search/Search.jsx'
import Settings from './components/Settings/Settings.jsx'
import Signup from './components/Signup/Signup.jsx'
import Upload from './components/Upload/Upload.jsx'
import UserProfile from './components/UserProfile/UserProfile.jsx'

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
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/messages' component={Chat} />
                <Route exact path='/upload' component={Upload} />
                <Route path='/upload/edit/' component={EditZone} />
                <Route path='/get-started' component={GetStarted} />
                <Route path='/settings' component={Settings} />
                <Route path='/edit-profile/' component={Settings} />
                <Route path='/search' component={Search} />
                <Route path='/user/*' component={UserProfile} />
                <Route path='/*' component={NotFound}/>
              </Switch>
            </Fragment>
          </Router>
        </ApolloProvider>
      </ReduxProvider>
    )
  }
}

export default Routes