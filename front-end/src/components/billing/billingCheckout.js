import React, { Fragment } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const billingCheckout = () => {
	const publishableKey = 'pk_test_Q92ozglyNRHHwz44yCal2sV7';

	const onToken = token => {
		const body = {
			unlimited_jobs: 29999,
			post_jobs12: 9999,
			post_job: 999,
			token: token,
		};

		axios
			.post('http://localhost:8000/payment', body)
			.then(response => {
				console.log(response);
				alert('Payment Success!');
			})
			.catch(error => {
				console.log('Payment Error: ', error);
				alert('payment Error');
			});
	};
};

export default billingCheckout;
