import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./checkoutForm";
import UserJobs from "./UserJobs.js";

// const stripeurl = process.env.REACT_APP_STRIPE_TEST_KEY;

class Billing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="billing-container">
        <StripeProvider apiKey="pk_test_77iYkIzmRpuMiC1SxkCkMIBp">
          <div className="example">
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
        <UserJobs authUser={this.props.authUser} />
      </div>
    );
  }
}

export default Billing;
