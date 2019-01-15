import React from 'react';

import AuthenticatedUserContext from './context.js';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authenticatedUser: null
            }
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(authenticatedUser => {
                authenticatedUser
                    ? this.setState({ authenticatedUser })
                    : this.setState({ authenticatedUser: null });
            });
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthenticatedUserContext.Provider value={this.state.authenticatedUser}>
                    <Component {...this.props} />
                </AuthenticatedUserContext.Provider>
            );
        }
    }
    return withFirebase(WithAuthentication);
}

export default withAuthentication;