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
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<div className="split-form">
					<label>
						Card number
						<CardNumberElement onChange={this.handleChange} />
					</label>
					<label>
						Expiration date
						<CardExpiryElement onChange={this.handleChange} />
					</label>
				</div>
				<div className="split-form">
					<label>
						CVC
						<CardCVCElement onChange={this.handleChange} />
					</label>
					<input
						type="radio"
						name="react-tips"
						value="option1"
						checked={true}
						className="form-check-input"
					/>
				</div>
				<div className="form-check">
					<label>
						<input
							type="radio"
							name="react-tips"
							value="option1"
							checked={true}
							className="form-check-input"
						/>
						Unlimited Jobs, 1 Month $299.99
					</label>
				</div>
				<div className="error" role="alert">
					{this.state.errorMessage}
				</div>
				<button>Pay</button>
			</form>
		);
	}
}

export default injectStripe(CheckoutForm);
