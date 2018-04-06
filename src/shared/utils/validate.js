/**
 * Form validation functions
 */
import Validator from 'validator'

export const validateLoginForm = (data) => {
  const { email, password } = data
  let errors = {}
  let isValid = true

  if(Validator.isEmpty(email))
    errors.username = 'E-Mail field is empty'
  if(Validator.isEmpty(password))
    errors.password = 'Password required to login'
  if(errors.password || errors.email)
    isValid = false

  return {
    errors,
    isValid
  }
}

export const validateSignupForm = (data) => {
  const { firstname, lastname, username, password, confirmPassword } = data
  let errors = {}
  let isValid = true

  if(Validator.isEmpty(firstname))
    errors.firstname = 'First Name is required'
  if(Validator.isEmpty(lastname))
    errors.lastname = 'Last Name is required'
  if(Validator.isEmpty(username))
    errors.username = 'Username is required'
  if(username.length > 12)
    errors.username = 'Username must be less than 8 chars.'
  if(Validator.isEmpty(password))
    errors.email = 'Email required to signup'
  if(Validator.isEmpty(password))
    errors.password = 'Password required to signup'
  if(confirmPassword != password)
    errors.password = 'Please confirm your password'
  if(password.length < 8 )
    errors.password = 'Password size must be greater than 8.'
  if(password !== confirmPassword) {
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