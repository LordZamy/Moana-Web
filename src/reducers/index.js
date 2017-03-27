import { combineReducers } from 'redux'

// authType = 'LOGIN' or 'REGISTER'
const authCreator = (authType) => (state = {}, action) => {
  switch (action.type) {
    case `${authType}_FAILURE`:
      return Object.assign({}, state, {
        errorMessage: action.errorMessage,
      })
    case `${authType}_SUCCESS`:
      return Object.assign({}, state, {
        errorMessage: null,
      })
    default:
      return state
  }
}

export default combineReducers({
  login: authCreator('LOGIN'),
  register: authCreator('REGISTER')
});
