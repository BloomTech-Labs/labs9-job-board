import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm';

// const stripeurl = process.env.REACT_APP_STRIPE_TEST_KEY;

class Billing extends Component {
	render() {
		return (
			<StripeProvider apiKey="pk_test_pg4HlNAjsfnKzQaFk5CmMeB4">
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
