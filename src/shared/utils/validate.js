/**
 * Form validation functions
 */
import Validator from 'validator'

export const validateLoginForm = (data) => {
  let errors = {}
  let isValid = true

  if(Validator.isEmpty(data.email))
    errors.username = 'A username is required'
  if(Validator.isEmpty(data.password))
    errors.password = 'Password required to login'
  if(errors.password || errors.email)
    isValid = false

  return {
    errors,
    isValid
  }
}

export const validateSignupForm = (data) => {
  let errors = {}
  let isValid = true

  if(Validator.isEmpty(data.username))
    errors.username = 'A username is required'
  if(Validator.isEmpty(data.password))
    errors.password = 'Password required to signup'
  if(data.confirmPassword != data.password)
    errors.password = 'Please confirm your password'
  if(data.password.length < 8 )
    errors.password = 'Password size must be greater than 8.'
  if(data.password !== data.confirmPassword) {
    isValid = false
    errors.confirmPassword = "Passwords do not match."
  }
  if(errors.password || errors.username)
    isValid = false

  return {
    errors,
    isValid
  }
}