import app from "firebase/app";
import "firebase/auth";

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
    this.emailProvider = new app.auth.EmailAuthProvider();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.authCredential = app.auth.EmailAuthProvider.credential;
  }

  // SIGN IN - Google OAuth
  // opens new window for user to sign in through Google
  doSignInWithGooglePopUp = () => {
    // console.log("in popup");
    return this.auth.signInWithPopup(this.googleProvider);
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
  // used for all authentication providers
  doSignOut = () => {
    return this.auth.signOut();
  };

  // PASSWORD RESET
  // firebase sends email to user to reset forgotten password
  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email);
  };

  // CHANGE PASSWORD
  // only accessible to users with 'password' provider
  // reauthenticates user before updating password
  doPasswordUpdate = async (currentPassword, newPassword) => {
    const user = this.auth.currentUser;
    try {
      const credential = this.authCredential(user.email, currentPassword);

      await user.reauthenticateAndRetrieveDataWithCredential(credential);

      return user.updatePassword(newPassword);
    } catch (error) {
      return error;
    }
  };
}

export default Firebase;
