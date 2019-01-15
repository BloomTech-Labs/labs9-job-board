import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import BillingCheckout from './billingCheckout';

class Billing extends Component {
	render() {
		return (
			<StripeProvider apiKey="pk_test_Q92ozglyNRHHwz44yCal2sV7">
				<BillingCheckout />
			</StripeProvider>
		);
	}
}

export default Billing;
