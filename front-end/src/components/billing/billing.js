import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm';

class Billing extends Component {
	render() {
		return (
			<StripeProvider apiKey="pk_test_Q92ozglyNRHHwz44yCal2sV7">
				<div>
					<Elements>
						<CheckoutForm />
					</Elements>
				</div>
			</StripeProvider>
		);
	}
}

export default Billing;
