import React, { Component } from 'react';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	injectStripe,
} from 'react-stripe-elements';

class CheckoutForm extends Component {
	state = {
		errorMessage: '',
	};
	// initiating the radio button 
	getInitialState = () => {
		return {
			selectedOption: 'unlimited jobs'
		};
	}
	// if error occurs, list the error that occured
	handleChange = ({ error }) => {
		if (error) {
			this.setState({ errorMessage: error.message });
		}
	};
	// if successfully submitted create a token
	handleSubmit = evt => {
		evt.preventDefault();
		if (this.props.stripe) {
			this.props.stripe.createToken().then(this.props.handleResult);
			console.log('Token was created');
		} else {
			console.log("Stripe.js hasn't loaded yet.");
		}
	};

	// handleOptionChange = () => {
	// 	this.setState({selectedOption: })
	// }

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
				</div>
				<div className="form-check">
					<label>
						<input
							type="radio"
							name="react-tips"
							value="unlimited jobs"
							checked={this.state.selectedOption === 'unlimited jobs'}
							className="form-check-input"
							onChange={}
						/>
						Unlimited Jobs, 1 Month $299.99
					</label>
				</div>
				<div className="form-check">
					<label>
						<input
							type="radio"
							name="react-tips"
							value="post job (12)"
							checked={this.state.selectedOption === 'post job (12)'}
							className="form-check-input"
						/>
						Post Job (12) - $99.99
					</label>
				</div>
				<div className="form-check">
					<label>
						<input
							type="radio"
							name="react-tips"
							value="post job"
							checked={true}
							className="form-check-input"
						/>
						Post Job - $9.99
					</label>
				</div>
				<div className="error" role="alert">
					{this.state.errorMessage}
				</div>
				<button>Buy Now</button>
			</form>
		);
	}
}

export default injectStripe(CheckoutForm);
