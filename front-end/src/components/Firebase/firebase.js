import app from "firebase/app";
import "firebase/auth";

import axios from "axios";

const URL = process.env.REACT_APP_DB_URL;

// configuration provided with Firebase account
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    // this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  redirectResult = () => {
    return this.auth.getRedirectResult();
  };

  // SIGN IN - Google OAuth
  doSignInWithGoogle = () => {
    return this.auth.signInWithRedirect(this.googleProvider);
  };

  doSignInWithGooglePopUp = () => {
    // console.log("in popup");
    return this.auth.signInWithPopup(this.googleProvider);
  };

  // SIGN IN - Facebook OAuth
  // doSignInWithFacebook = () => {
  //   return this.auth.signInWithRedirect(this.facebookProvider);
  // }

  // REDIRECT RESULT
  // unsure if this will be needed
  doGetRedirectData = () => {
    this.auth
      .getRedirectResult()
      .then(result => {
        return result;
      })
      .then(user => {
        if (this.authRedirected) return; // Skip

        // Do stuff.

        this.authRedirected = true; // Mark redirected
      });
  };

  // SIGN UP - email and password
  // Password must be 6 characters long
  // Email must not already be in use
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  // SIGN IN - email and password
  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  // SIGN OUT
  doSignOut = () => {
    return this.auth.signOut();
  };

  // PASSWORD RESET
  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  // CHANGE PASSWORD
  doPasswordUpdate = password => {
    this.auth.currentUser.updatePassword(password);
  };
}

export default Firebase;
