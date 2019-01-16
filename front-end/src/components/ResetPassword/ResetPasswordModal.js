import React from 'react';
import { withRouter } from "react-router-dom";

import * as ROUTES from '../../constants/routes';

const ResetPasswordModal = props => {
    setTimeout(() => {
        props.history.push(ROUTES.SIGN_IN);
    }, 5000);
    return (
        <div className={`reset-password-modal${props.modalVisible ? " visible" : ''}`}>
            <div className="reset-password-modal-message">
                Check email for link to reset password. Redirecting...
            </div>
        </div>
    )
}

export default withRouter(ResetPasswordModal);