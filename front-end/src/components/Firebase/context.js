import React from "react";

// context to ensure only one instance of provider
const FirebaseContext = React.createContext(null);

// HOC to wrap necessary components in Firebase consumer instance
export const withFirebase = Component => props => {
  return (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
};

export default FirebaseContext;
