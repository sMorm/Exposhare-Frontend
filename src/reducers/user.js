import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from 'lodash/isEmpty'

// Default State, user is not signed in
const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action= {}) => {
  switch(action.type) {
    case SET_CURRENT_USER: // If the action is setting current user
      return {
        isAuthenticated: !isEmpty(action.user),
        info: action.user
      } // Add to redux state the user
    default: return state // Action doesnt apply
  }
}