import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";

import CheckoutForm from "./checkoutForm";

class Billing extends Component {
  // Billing is treated like App.js in React, it holds the props of Stripe
  // contains StripeProvider wrapper and Stripe Elements form
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_77iYkIzmRpuMiC1SxkCkMIBp">
          <div className="billing-container">
            <div className="header">
              <div className="main-header">Billing</div>
              <hr />
              <div className="sub-header">
                {`This isn't your typical purchase.`} <br />{" "}
                {"This is going to be a"}
                <em className="gotcha"> game changer.</em>
              </div>
            </div>
            <Elements>
              {/* Stripe Elements form */}
              <CheckoutForm authUser={this.props.authUser} />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}

export default Billing;
