import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm';
import BillingCheckout from './billingCheckout';

class Billing extends Component {
	render() {
		return (
			<StripeProvider apiKey="pk_test_Q92ozglyNRHHwz44yCal2sV7">
				<div className="billing-header">
					<h1>KWC Billing</h1>
					<Elements>
						<CheckoutForm />
					</Elements>
					<Elements>
						<BillingCheckout />
					</Elements>
				</div>
			</StripeProvider>
		);
	}
}

export default Billing;
