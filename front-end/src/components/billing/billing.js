import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm';

class Billing extends Component {
	render() {
		return (
			<StripeProvider apiKey="pk_test_Q92ozglyNRHHwz44yCal2sV7">
				<CheckoutForm />
			</StripeProvider>
		);
	}
}

export default Billing;
