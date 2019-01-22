import React, { Component } from 'react';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	injectStripe,
} from 'react-stripe-elements';

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		//render a message only if purchase is complete
		this.state = { complete: false };
		this.submit = this.submit.bind(this);
	}

	async submit(ev) {
		ev.preventDefault();
		let { token } = await this.props.stripe.createToken({ name: 'Name' });
		let response = await fetch('http://localhost:9000/charge', {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain' },
			body: token.id,
		});
		// if checkout is complete then message will be displayed
		if (response.ok) this.setState({ complete: true });
		console.log('Purchase Complete!');
		alert('Payment Successful!');
	}

	render() {
		return (
			<div className="checkout">
				<p>KWC Billing</p>
				<p>Would you like to complete your purchase?</p>
				<CardNumberElement />
				<CardExpiryElement />
				<CardCVCElement />
				<button onClick={this.submit}>Buy Now</button>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);
