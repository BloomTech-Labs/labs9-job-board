// import React from "react";
// import Spinner from "../../images/loading-spinner.gif";

// import { withRouter } from "react-router-dom";

// import { withFirebase } from "../Firebase/index";

// import * as ROUTES from "../../constants/routes";

// import "./RedirectPage.css";
// import axios from "axios";

// const URL = process.env.REACT_APP_DB_URL_TEST;

// const RedirectPage = props => {
//   const redirectLogic = () => {
//     // try {
//     // debugger;
//     if (props.location.state) {
//       // debugger;
//       if (props.location.state.redirectMethod === "google") {
//         props.firebase
//           .doSignInWithGooglePopUp()
//           .then(authUser => {
//             console.log("authUser", authUser);
//             if (authUser.user && authUser.user.uid) {
//               const user_uid = authUser.user.uid;
//               const email = authUser.user.email;

//               return axios.post(`${URL}/api/auth/login`, {
//                 user_uid,
//                 email
//               });
//               // console.log("firstLogin", firstLogin);

//               //props.history.push(ROUTES.LANDING);
//             } else {
//               props.history.push(ROUTES.LANDING);
//             }
//           })
//           .then(response => {
//             console.log("firstlogin", response);
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       } else {
//         props.history.push({
//           pathname: ROUTES.SIGN_IN,
//           state: {
//             error: "Please try to sign in again."
//           }
//         });
//       }
//     }
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   };

//   redirectLogic();

//   // props.history.push(ROUTES.LANDING);

//   // console.log(error);

//   return (
//     <div className="redirect-page-container">
//       <img src={Spinner} alt="Loading spinner" />
//     </div>
//   );
// };

// export default withRouter(withFirebase(RedirectPage));
