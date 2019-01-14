import React, { Component } from 'react';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	injectStripe,
	StripeProvider,
	Elements,
} from 'react-stripe-elements';

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
		<form onSubmit={this.handleSubmit.bind(this)}>
			<div className="split-form">
				<label>
					Card number
					<CardNumberElement
						{...createOptions()}
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Expiration date
					<CardExpiryElement
						{...createOptions()}
						onChange={this.handleChange}
					/>
				</label>
			</div>
			<div className="split-form">
				<label>
					CVC
					<CardCVCElement {...createOptions()} onChange={this.handleChange} />
				</label>
			</div>
			<div className="error" role="alert">
				{this.state.errorMessage}
			</div>
			<button>Pay</button>
		</form>;
	}
}

export default injectStripe(CheckoutForm);
