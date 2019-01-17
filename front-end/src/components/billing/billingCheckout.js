import React, { Fragment } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const billingCheckout = () => {
	const publishableKey = 'pk_test_Q92ozglyNRHHwz44yCal2sV7';

	const onToken = token => {
		const body = {
			//Need to find out how to add multiple payments to mirror the amounts in checkout
			amount: 9999,
			token: token,
		};

		axios
			// need help figuring out what to add to the post routes to match up with the backend route
			.post('http://localhost:9000/payment', body)
			.then(response => {
				console.log('Payment Success', response);
			})
			.catch(error => {
				console.log('Payment Error: ', error);
			});
	};
	return (
		<div>
			<div>
				<StripeCheckout
					label="Unlimited Jobs" //Component button text
					name="KWC" //Modal Header
					description="Unlimited Jobs (1 month)"
					panelLabel="Unlimited Jobs" //Submit button in modal
					amount={29999} //Amount in cents $299.99
					token={onToken}
					stripeKey={publishableKey}
				/>
			</div>
			<div>
				<StripeCheckout
					label="Post Jobs" //Component button text
					name="KWC" //Modal Header
					description="Post Jobs (12)"
					panelLabel="Post Jobs" //Submit button in modal
					amount={9999} //Amount in cents $99.99
					token={onToken}
					stripeKey={publishableKey}
				/>
			</div>
			<div>
				<StripeCheckout
					label="Post Job" //Component button text
					name="KWC" //Modal Header
					description="Post a Job"
					panelLabel="Post a Job" //Submit button in modal
					amount={999} //Amount in cents $9.99
					token={onToken}
					stripeKey={publishableKey}
				/>
			</div>
		</div>
	);
};

export default billingCheckout;
