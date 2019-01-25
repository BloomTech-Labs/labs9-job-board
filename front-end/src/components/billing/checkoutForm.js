import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import "./checkoutForm.scss";
import axios from "axios";

import StripeLogo from "../../images/powered_by_stripe.png";

const URL = process.env.REACT_APP_DB_URL_TEST;

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    //render a message only if purchase is complete
    this.state = {
      complete: false,
      selectedOption: "",
      selectionMessage: "",
      paymentMessage: ""
    };
    this.submit = this.submit.bind(this);
  }
  //initiating the radio button
  getInitialState = () => {
    return {
      selectedOption: ""
    };
  };
  //handle radio button
  handleOptionChange = event => {
    this.setState({ selectedOption: event.target.value });
  };

  async submit(ev) {
    ev.preventDefault();
    if (this.state.selectedOption) {
      let createResponse = await this.props.stripe.createToken();
      console.log(createResponse);
      console.log(createResponse.token.id);

      if (!createResponse.error && createResponse.token.id) {
        const stripeResponse = await axios.post(`${URL}/api/stripe/charge`, {
          source: createResponse.token.id,
          option: this.state.selectedOption
        });
        console.log(stripeResponse);
      } else {
        if (createResponse.error) {
          if (createResponse.error.code === "incomplete_number") {
            this.setState({
              paymentMessage: "Form incomplete. Check card number."
            });
          } else if (createResponse.error.code === "incomplete_expiry") {
            this.setState({
              paymentMessage: "Form incomplete. Check expiration date."
            });
          } else if (createResponse.error.code === "incomplete_cvc") {
            this.setState({
              paymentMessage: "Form incomplete. Check CVC."
            });
          }
        } else {
          this.setState({
            paymentMessage: "Error creating Stripe token."
          });
        }
      }
      //   let response = await fetch("http://localhost:9000/charge", {
      //     method: "POST",
      //     headers: { "Content-Type": "text/plain" },
      //     body: token.id
      //   });
      //   console.log(response);
      //   // if checkout is complete then message will be displayed
      //   if (response.ok) this.setState({ complete: true });
    } else {
      this.setState({ selectionMessage: "Please choose an option." });
    }
  }

  render() {
    if (this.state.complete) {
      return <h1>Purchase Complete!</h1>;
    }
    return (
      <div id="shop" className="checkout">
        <div className="purchase-options">
          <p className="billing-header">Billing</p>
          <p className="billing-subheader">
            Select number of job postings you would like to purchase
          </p>
          <form className="options">
            <label>
              <input
                type="radio"
                name="unlimited"
                value="unlimited"
                checked={this.state.selectedOption === "unlimited"}
                onChange={this.handleOptionChange}
              />
              {"Unlimited Jobs, 1 Month - $299.99"}
            </label>
            <label>
              <input
                type="radio"
                name="jobs12"
                value="jobs12"
                checked={this.state.selectedOption === "jobs12"}
                onChange={this.handleOptionChange}
              />
              {"Jobs (12) - $99.99"}
            </label>
            <label>
              <input
                type="radio"
                name="job1"
                value="job1"
                checked={this.state.selectedOption === "job1"}
                onChange={this.handleOptionChange}
              />
              {"Job (1) - $9.99"}
            </label>
          </form>
          <span>{this.state.selectionMessage || null}</span>
        </div>
        <div className="card-info">
          <p className="card-info-labels"> Card Number</p>
          <CardNumberElement className="card-info-placeholder" />
          <p className="card-info-labels"> Expiration Date</p>
          <CardExpiryElement />
          <p className="card-info-labels"> CVC </p>
          <CardCVCElement />
          <button
            className="buy-now-button"
            id="buttonCheckout"
            onClick={this.submit}
          >
            Buy Now
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
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
