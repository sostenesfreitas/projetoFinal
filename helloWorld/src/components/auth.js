/* eslint-disable */
import firebase from 'firebase'
import firebaseUiAuthCss from 'firebaseui/dist/firebaseui.css'
import firebaseui from 'firebaseui'
const user = {
  displayName: '',
  email: '',
  emailVerified: false,
  photoURL: '',
  uid: ''
}

const getUser = () => {
  return user
}

const authUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((theUser) => {
      _checkUser(theUser)
      resolve(theUser)
    }, (error) => {
      console.log(error)
    })
  })
}

const logout = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.reload()
  }, (error) => {
    // An error happened.
    console.log(error)
    window.location.reload()
  })
}

const _checkUser = (theUser) => {
  if (theUser) {
    user.displayName = theUser.displayName
    user.email = theUser.email
    user.emailVerified = theUser.emailVerified
    user.photoURL = theUser.photoURL
    user.uid = theUser.uid
  } else {
    user.displayName = ''
    user.email = ''
    user.emailVerified = false
    user.photoURL = ''
    user.uid = ''
    _initAuthUI()
  }
}

const login = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider).then(function() {
  firebase.auth().getRedirectResult().then(function(result) {
    // This gives you a Google Access Token.
    // You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
});
}
const _initAuthUI = () => {
  const uiConfig = {
    callbacks: {
      signInSuccess: function(currentUser, credential, redirectUrl) {
        // Do something.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    // Query parameter name for mode.
    queryParameterForWidgetMode: 'mode',
    // Query parameter name for sign in success url.
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: [
          'https://www.googleapis.com/auth/plus.login'
        ]
      },
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '/'
  }

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth())
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig)
}

export default {
  getUser,
  logout,
  authUser,
  login
}
