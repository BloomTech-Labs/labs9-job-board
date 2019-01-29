import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

import CheckoutForm from './checkoutForm';
import UserJobs from './UserJobs.js';
import Balance from './Balance.js';

import './checkoutForm.scss';

// const stripeurl = process.env.REACT_APP_STRIPE_TEST_KEY;

class Billing extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{/* <Balance authUser={this.props.authUser} /> */}
				<StripeProvider apiKey="pk_test_77iYkIzmRpuMiC1SxkCkMIBp">
					<div className="example">
						<Elements>
							<CheckoutForm authUser={this.props.authUser} />
						</Elements>
					</div>
				</StripeProvider>
				<UserJobs authUser={this.props.authUser} />
			</div>
		);
	}
}

export default Billing;
