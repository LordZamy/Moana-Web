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

const userData = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return Object.assign({}, state, {
        firebaseUser: action.user
      })
    default:
      return state
  }
}

const initalDashboardState = {drawerOpen: false}
const dashboard = (state = initalDashboardState, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return Object.assign({}, state, {
        drawerOpen: !state.drawerOpen
      })
    default:
      return state
  }
}

export default combineReducers({
  login: authCreator('LOGIN'),
  register: authCreator('REGISTER'),
  userData,
  dashboard
});
