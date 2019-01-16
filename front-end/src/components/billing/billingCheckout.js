import React from 'react';
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
