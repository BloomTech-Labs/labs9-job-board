import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { Elements } from 'react-stripe-elements';

import CheckoutForm from './checkoutForm';

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
