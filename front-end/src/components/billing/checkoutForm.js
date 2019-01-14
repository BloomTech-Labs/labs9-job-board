import React, { Component } from 'react';
import {
	CardElement,
	injectStripe,
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	Elements,
} from 'react-stripe-elements';

const createOptions = () => {
	return {
		style: {
			base: {
				fontSize: '16px',
				color: '#424770',
				letterSpacing: '0.025em',
				'::placerholder': {
					color: '#aab7c4',
				},
			},
			invalid: {
				color: '#c23d4b',
			},
		},
	};
};

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = { complete: false };
		this.submit = this.submit.bind(this);
	}

	async submit(ev) {
		let { token } = await this.props.stripe.createToken({ name: 'Name' });
		let response = await fetch('/charge', {
			method: 'POST',
			HEADERS: { 'Content-Type': 'text/plain' },
			body: token.id,
		});

		if (response.ok) this.setState({ complete: true });
	}

	render() {
		if (this.state.complete) return <h1>Purhcase Complete!</h1>;

		return (
			<div className="checkout">
				<CardElement />
				<button onClick={this.submit}>Buy</button>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);
