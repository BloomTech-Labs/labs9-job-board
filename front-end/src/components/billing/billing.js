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
          <div className="billing-container">
            <div className="header">
              <p className="billing-header">Billing</p>
              <hr />
              <p className="billing-subheader">
                This isn't your typical purchase, ths is going to be a
                <em className="gotcha"> game changer</em>
              </p>
            </div>
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
