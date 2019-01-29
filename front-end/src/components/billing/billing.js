import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";

import CheckoutForm from "./checkoutForm";

import "./checkoutForm.scss";

// const stripeurl = process.env.REACT_APP_STRIPE_TEST_KEY;

class Billing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_77iYkIzmRpuMiC1SxkCkMIBp">
          <div className="container">
            <Elements>
              <CheckoutForm authUser={this.props.authUser} />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}

export default Billing;
