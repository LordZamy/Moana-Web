import firebase from 'firebase'
import { browserHistory } from 'react-router'

const transitionTo = (url) => {
  browserHistory.push(url)
}

export const login = (email, password) => (dispatch) => {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      dispatch({
          type: 'LOGIN_FAILURE',
          errorMessage
      })
    }).then((user) => {
      if (user) {
        dispatch({
          type: 'LOGIN_SUCCESS',
        })
        dispatch({
          type: 'ADD_USER',
          user
        })
        transitionTo('/dashboard')
      }
    });
}

export const register = (email, password) => (dispatch) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    dispatch({
      type: 'REGISTER_FAILURE',
      errorMessage
    })
  }).then((user) => {
    if (user) {
      user.updateProfile({
        displayName: name
      }).then(() => {
        dispatch({
          type: 'REGISTER_SUCCESS',
        })
        dispatch({
          type: 'ADD_USER',
          user
        })
        transitionTo('/dashboard')
      })
    }
  })
}

export const logout = () => (dispatch) => {
  return firebase.auth().signOut().catch((error) => {
    console.error(error)
    dispatch({
      type: 'LOGOUT_ERROR',
      errorMessage: error
    })
  }).then(() => {
    dispatch({
      type: 'LOGOUT_SUCCESS'
    })
    dispatch({
      type: 'REMOVE_USER'
    })
    transitionTo('/')
  })
}
