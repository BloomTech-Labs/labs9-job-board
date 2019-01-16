import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { Elements } from 'react-stripe-elements';

import CheckoutForm from './checkoutForm';
import STRIPE_PUBLISHABLE from './stripe';
import PAYMENT_SERVER_URL from './server';

class BillingCheckout extends React.Component {
	render() {
		return (
			<Elements>
				<CheckoutForm />
			</Elements>
		);
	}
}

export default BillingCheckout;
