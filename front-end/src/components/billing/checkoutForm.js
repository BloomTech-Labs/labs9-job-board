import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import "./checkoutForm.scss";

import StripeLogo from "../../images/powered_by_stripe.png";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    //render a message only if purchase is complete
    this.state = {
      complete: false,
      selectedOption: ""
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
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("http://localhost:9000/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });
    console.log(response);
    // if checkout is complete then message will be displayed
    if (response.ok) this.setState({ complete: true });
    console.log("Purchase Complete");
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
                name="100 credits - $299.99"
                value="100 credits"
                checked={this.state.selectedOption === "100 credits"}
                onChange={this.handleOptionChange}
              />
              100 Jobs - $299.99
            </label>
            <label>
              <input
                type="radio"
                name="50 credits - $99.99"
                value="50 credits"
                checked={this.state.selectedOption === "50 credits"}
                onChange={this.handleOptionChange}
              />
              50 Jobs - $99.99
            </label>
            <label>
              <input
                type="radio"
                name="1 credit - $9.99"
                value="1 credit"
                checked={this.state.selectedOption === "1 credit"}
                onChange={this.handleOptionChange}
              />
              1 Job - $9.99
            </label>
          </form>
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
