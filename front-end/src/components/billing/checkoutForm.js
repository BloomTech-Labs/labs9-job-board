import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
	state = {
		errorMessage: '',
	};

	handleChange = ({ error }) => {
		if (error) {
			this.setState({ errorMessage: error.message });
		}
	};

	handleSubmit = evt => {
		evt.preventDefault();
		if (this.props.stripe) {
			this.props.stripe.createToken().then(this.props.handleResult);
		} else {
			console.log("Stripe.js hasn't loaded yet.");
		}
	};

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
