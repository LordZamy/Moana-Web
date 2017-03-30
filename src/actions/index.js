import firebase from 'firebase'
import { browserHistory } from 'react-router'

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
        transitionToDashboard()
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
        transitionToDashboard()
      })
    }
  })
}

const transitionToDashboard = () => {
  browserHistory.push('/dashboard')
}
