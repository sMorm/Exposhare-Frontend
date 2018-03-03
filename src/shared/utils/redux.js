import { Provider as ReduxProvider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../../reducers/rootReducer'
import { setCurrentUser } from '../../actions/user'
import jwt from 'jsonwebtoken'


export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk), 
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

/**
 * 
 * @param {dispatch} redux dispatch func. 
 * @param {token} jwt token
 * @param {push} context history to push to a page
 * Post Signup/Login flow
 */
export const dispatchAndRedirect = ({ dispatch, token, push }) => {
  localStorage.setItem('jwtToken', token)
  dispatch(setCurrentUser(jwt.decode(token)))
  push('/')
}