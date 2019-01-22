import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm';

const url = process.env.REACT_APP_STRIPE_TEST_KEY;

class Billing extends Component {
	render() {
		return (
			<StripeProvider apiKey={REACT_APP_STRIPE_TEST_KEY}>
				<div className="example">
					<Elements>
						<CheckoutForm />
					</Elements>
				</div>
			</StripeProvider>
		);
	}
}

export default Billing;
