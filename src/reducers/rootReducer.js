import { combineReducers } from 'redux'
import user from './user.js'

export default combineReducers({
  user // Only saving global state of current user
})