import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import BillingCheckout from './billingCheckout';

class Billing extends Component {
	render() {
		return (
			<StripeProvider apiKey="pk_test_Q92ozglyNRHHwz44yCal2sV7">
				<div className="billing-header">
					<BillingCheckout />
				</div>
			</StripeProvider>
		);
	}
}

export default Billing;
