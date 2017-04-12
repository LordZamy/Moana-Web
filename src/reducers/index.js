import { combineReducers } from 'redux'

// authType = 'LOGIN' or 'REGISTER' or 'LOGOUT'
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
    case 'REMOVE_USER':
      return Object.assign({}, state, {
        firebaseUser: null
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

const editProfile = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_PROFILE_SUCCESS':
      return Object.assign({}, state, {
        success: true
      })
    default:
      return state
  }
}

export default combineReducers({
  login: authCreator('LOGIN'),
  register: authCreator('REGISTER'),
  logout: authCreator('LOGOUT'),
  userData,
  dashboard,
  editProfile
});
