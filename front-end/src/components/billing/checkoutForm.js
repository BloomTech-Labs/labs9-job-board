import React, { Component } from 'react';
import {
	CardNumberElement,
	CardExpiryElement,
	CardCVCElement,
	injectStripe,
} from 'react-stripe-elements';
import './checkoutForm.scss';
import axios from 'axios';

import PaymentModal from './PaymentModal.js';

import StripeLogo from '../../images/powered_by_stripe.png';
import LoadingCircle from '../../images/loading-circle.svg';

const URL = process.env.REACT_APP_DB_URL;

const DEFAULT_STATE = {
	selectedOption: '',
	selectionMessage: '',
	paymentMessage: '',
	processing: false,
	successVisible: false,
	purchase: '',
	failureVisible: false,
};

const AMOUNT_TO_PURCHASE = {
	999: 'Job (1) - $9.99',
	9999: 'Jobs (12) - $99.99',
	29999: 'Unlimited Jobs, 1 Month - $299.99',
};

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...DEFAULT_STATE,
			inputValue: props.inputValue,
		};
		this.submit = this.submit.bind(this);
	}
	// reset the form to the DEFAULT_STATE
	resetForm = () => {
		this.setState({ ...DEFAULT_STATE });
	};

	setDefaultState = () => {
		this.setState({ ...DEFAULT_STATE });
	};

	//handle radio button
	handleOptionChange = event => {
		this.setState({ selectedOption: event.target.value });
	};

	async submit(ev) {
		ev.preventDefault();
		if (this.state.selectedOption) {
			await this.setState({ processing: true });
			let createResponse = await this.props.stripe.createToken();
			console.log(createResponse);

			if (!createResponse.error && createResponse.token.id) {
				const stripeResponse = await axios.post(`${URL}/api/billing/charge`, {
					source: createResponse.token.id,
					option: this.state.selectedOption,
					user_uid: this.props.authUser.uid,
				});

				if (stripeResponse.data.status && stripeResponse.data.amount) {
					if (stripeResponse.data.status === 'succeeded') {
						this.setState(
							{
								processing: false,
								successVisible: true,
								purchase: AMOUNT_TO_PURCHASE[stripeResponse.data.amount],
							},
							() => {
								setTimeout(() => {
									this.setState({ ...DEFAULT_STATE });
									this.cardElement.clear();
									this.expiryElement.clear();
									this.cvcElement.clear();
								}, 3000);
							},
						);
					} else {
						await this.setState(
							{
								processing: false,
								failureVisible: true,
								purchase: AMOUNT_TO_PURCHASE[stripeResponse.data.amount],
							},
							() => {
								setTimeout(() => {
									this.setState({ ...DEFAULT_STATE });
									this.cardElement.clear();
									this.expiryElement.clear();
									this.cvcElement.clear();
								}, 3000);
							},
						);
					}
				} else {
					await this.setState({ processing: false });
				}
			} else {
				if (createResponse.error) {
					if (createResponse.error.code === 'incomplete_number') {
						this.setState({
							paymentMessage: 'Form incomplete. Check card number.',
						});
					} else if (createResponse.error.code === 'incomplete_expiry') {
						this.setState({
							paymentMessage: 'Form incomplete. Check expiration date.',
						});
					} else if (createResponse.error.code === 'incomplete_cvc') {
						this.setState({
							paymentMessage: 'Form incomplete. Check CVC.',
						});
					}
				} else {
					this.setState({
						paymentMessage: 'Error creating Stripe token.',
					});
				}
			}
		} else {
			this.setState({ selectionMessage: 'Please choose an option.' });
		}
	}

	//update the input value when the cancel button is clicked
	updateInput = val => {
		return this.setState({ inputValue: val });
	};

	render() {
		return (
			<div className="checkout">
				<div className="purchase-options">
					<p className="billing-header">Billing</p>
					<p className="billing-subheader">
						This isn't your typical purchase, ths is going to be a{' '}
						<span className="gotcha">game changer</span>
					</p>
					<form className="options">
						<label>
							<input
								type="radio"
								name="unlimited"
								value="unlimited"
								checked={this.state.selectedOption === 'unlimited'}
								onChange={this.handleOptionChange}
							/>
							{'Unlimited Jobs, 1 Month - $299.99'}
						</label>
						<label>
							<input
								type="radio"
								name="job12"
								value="job12"
								checked={this.state.selectedOption === 'job12'}
								onChange={this.handleOptionChange}
							/>
							{'Jobs (12) - $99.99'}
						</label>
						<label>
							<input
								type="radio"
								name="job1"
								value="job1"
								checked={this.state.selectedOption === 'job1'}
								onChange={this.handleOptionChange}
							/>
							{'Job (1) - $9.99'}
						</label>
					</form>
					<span>{this.state.selectionMessage || null}</span>
				</div>
				<div className="card-info">
					<p className="card-info-labels"> Card Number</p>
					<CardNumberElement
						className="card-info-placeholder"
						onReady={element => (this.cardElement = element)}
					/>
					<p className="card-info-labels"> Expiration Date</p>
					<CardExpiryElement
						className="card-info-placeholder"
						onReady={element => (this.expiryElement = element)}
					/>
					<p className="card-info-labels"> CVC </p>
					<CardCVCElement
						className="card-info-placeholder"
						onReady={element => (this.cvcElement = element)}
					/>
					<button
						className="purchase"
						id="buttonCheckout"
						onClick={this.submit}
						disabled={!this.props.authUser}
					>
						{this.state.processing ? (
							<img src={LoadingCircle} alt="loading" />
						) : (
							'Purchase'
						)}
					</button>
					<button className="cancel" onClick={this.resetForm} type="button">
						Cancel
					</button>
					<span>{this.state.paymentMessage || null}</span>
					<a href="https://stripe.com/">
						<img
							src={StripeLogo}
							alt="Powered by Stripe"
							className="powered-by-stripe"
						/>
					</a>
				</div>
				<PaymentModal
					successVisible={this.state.successVisible}
					failureVisible={this.state.failureVisible}
					successPurchase={this.state.successPurchase}
				/>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);
