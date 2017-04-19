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
        transitionTo('/dashboard/map')
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
    transitionTo('/')
    dispatch({
      type: 'LOGOUT_SUCCESS'
    })
    dispatch({
      type: 'REMOVE_USER'
    })
  })
}

const accountTypes = ['User', 'Worker', 'Admin', 'Manager']

export const updateProfile = (name, email, accountTypeId) => (dispatch) => {
  let user = firebase.auth().currentUser
  let accountType = accountTypes[accountTypeId]

  if (user) {
    name = (name === '') ? user.name : name
    email = (email === '') ? user.email : email

    return user.updateProfile({
      displayName: name,
      photoURL: accountType
    }).catch((error) => {
      console.error(error)
    }).then(() => {
      // update email only if it changes
      // dispatch ADD_USER either way
      if (email !== user.email) {
        user.updateEmail(email).catch((error) => {
          console.error(error)
        }).then(() => {
          dispatch({
            type: 'ADD_USER',
            user
          })
        })
      } else {
        dispatch({
          type: 'ADD_USER',
          user
        })
      }

      dispatch({
        type: 'EDIT_PROFILE_SUCCESS'
      })
    })
  }
}

const availStatus = ['Available', 'Unavailable']

export const addAvailReport = (name, status, lat, lng) => (dispatch) => {
  let database = firebase.database()
  let user = firebase.auth().currentUser

  if (!user || !database) {
    // TODO: error handling
    return
  }

  let postDate = new Date()
  let postStatus = availStatus[status]
  let account = {
      accountType: user.photoURL.toUpperCase(),
      emailAddress: user.email,
      homeAddress: "",
      name: user.displayName,
      password: "",
      username: user.uid
  }
  let date = {
      date: postDate.getDate(),
      day: postDate.getDay(),
      hours: postDate.getHours(),
      minutes: postDate.getMinutes(),
      month: postDate.getMonth(),
      seconds: postDate.getSeconds(),
      time: postDate.getTime(),
      timezoneOffset: postDate.getTimezoneOffset(),
      year: postDate.getFullYear() - 1900
  }

  // A post entry.
  var postData = {
    creator: {
        account: account
    },
    date: date,
    lat: lat,
    lng: lng,
    name: name,
    status: postStatus
  };

  var newPostKey = firebase.database().ref().child('reports').child('availability').push().key;

  var updates = {};
  updates['/reports/availability/' + newPostKey] = postData;

  return database.ref().update(updates).catch((error) => {
    console.error(error)
  }).then(() => {
    dispatch({
      type: 'ADD_REPORT_SUCCESS'
    })
    //transitionTo('/dashboard/map')
  })
}



export const addPurityReport = (name, location, lat, lng, virusPPM, contPPM) => (dispatch) => {
  let database = firebase.database()
  let user = firebase.auth().currentUser
  let postDate= new Date()
  let postStatus = availStatus[status]
  let account = {
      accountType: user.photoURL.toUpperCase(),
      emailAddress: user.email,
      homeAddress: "",
      name: user.displayName,
      password: "",
      username: user.uid
  }
  let date = {
      date: postDate.getDate(),
      day: postDate.getDay(),
      hours: postDate.getHours(),
      minutes: postDate.getMinutes(),
      month: postDate.getMonth(),
      seconds: postDate.getSeconds(),
      time: postDate.getTime(),
      timezoneOffset: postDate.getTimezoneOffset(),
      year: postDate.getFullYear()-1900
  }
  // A post entry.
  var postData = {
    creator: {
        account: account
    },
    date: date,
    lat: lat,
    lng: lng,
    name: name,
    location: location,
    contaminationPPM: contPPM,
    virusPPM: virusPPM,
    condition: "SAFE"
  };

  var newPostKey = firebase.database().ref().child('reports').child('purity').push().key;

  var updates = {};
  updates['/reports/purity/' + newPostKey] = postData;


  if (database) {
      return database.ref().update(updates).catch((error) => {
      console.error(error)
    }).then(() => {
      dispatch({
        type: 'ADD_REPORT_SUCCESS'
      })
      //transitionTo('/dashboard/map')
    })
  }
}
