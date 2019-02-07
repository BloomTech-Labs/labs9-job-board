import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import axios from "axios";

import PaymentModal from "./PaymentModal.js";

import StripeLogo from "../../images/powered_by_stripe.png";
import Loading from "../../images/design/png/loading-bar.svg";
import Balance from "./Balance";
import UserJobs from "./UserJobs.js";

// Variable used for our DB
const URL = process.env.REACT_APP_DB_URL;

// Initial state of the checkout form
const DEFAULT_STATE = {
  selectedOption: "",
  selectionMessage: "",
  paymentMessage: "",
  processing: false,
  successVisible: false,
  purchase: "",
  failureVisible: false
};

// Amounts set to purchase
const AMOUNT_TO_PURCHASE = {
  999: "Job (1) - $9.99",
  9999: "Jobs (12) - $99.99",
  29999: "1 Month Unlimited - $299.99"
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...DEFAULT_STATE
    };
    this.submit = this.submit.bind(this);
  }
  // reset the form to the DEFAULT_STATE once payment has been made
  resetForm = () => {
    this.setState({ ...DEFAULT_STATE });
  };
  // setting the form to the DEFAULT_STATE
  setDefaultState = () => {
    this.setState({ ...DEFAULT_STATE });
  };

  //handle radio button
  handleOptionChange = event => {
    this.setState({ selectedOption: event.target.value });
  };

  //update the input value when the cancel button is clicked
  updateInput = () => {
    this.setState({ ...DEFAULT_STATE });
    this.cardElement.clear();
    this.expiryElement.clear();
    this.cvcElement.clear();
  };

  //restarting page
  restartPage() {
    window.location.reload();
  }

  //the submit function when a radio button has been selected
  async submit(ev) {
    try {
      ev.preventDefault();
      await this.setState({
        selectionMessage: "",
        paymentMessage: "",
        processing: true
      });
      //logic that awaits to see if an option was selected and if true then process that selection with payment to create a token
      if (this.state.selectedOption) {
        let createResponse = await this.props.stripe.createToken();

        //if there is no errors, then apply that option with the auth user account in our DB
        if (!createResponse.error && createResponse.token.id) {
          const stripeResponse = await axios.post(`${URL}/api/billing/charge`, {
            source: createResponse.token.id,
            option: this.state.selectedOption,
            user_uid: this.props.authUser.uid
          });
          // status and amount are truthy, check if status is 'succeeded'
          if (stripeResponse.data.status && stripeResponse.data.amount) {
            if (stripeResponse.data.status === "succeeded") {
              // if 'succeeded', display success modal
              this.setState(
                {
                  processing: false,
                  successVisible: true,
                  purchase: AMOUNT_TO_PURCHASE[stripeResponse.data.amount]
                },
                () => {
                  // clear form and reset state if payment successed (timeout for modal visible)
                  setTimeout(() => {
                    this.setState({ ...DEFAULT_STATE });
                    this.cardElement.clear();
                    this.expiryElement.clear();
                    this.cvcElement.clear();
                    //page refreshes after modal displays
                    this.restartPage();
                  }, 3000);
                }
              );
            } else {
              // if payment is not 'succeeded', display failure modal
              await this.setState(
                {
                  processing: false,
                  failureVisible: true,
                  purchase: AMOUNT_TO_PURCHASE[stripeResponse.data.amount]
                },
                () => {
                  // clear form and reset state if payment was successful modal displays
                  setTimeout(() => {
                    this.setState({ ...DEFAULT_STATE });
                    this.cardElement.clear();
                    this.expiryElement.clear();
                    this.cvcElement.clear();
                  }, 3000);
                }
              );
            }
          } else {
            await this.setState({ processing: false });
          }
        } else {
          // set display message if errors in the card number, exp date, and cvc
          if (createResponse.error) {
            if (createResponse.error.code === "incomplete_number") {
              this.setState({
                paymentMessage: "Form incomplete. Check card number.",
                processing: false
              });
            } else if (createResponse.error.code === "incomplete_expiry") {
              this.setState({
                paymentMessage: "Form incomplete. Check expiration date.",
                processing: false
              });
            } else if (createResponse.error.code === "incomplete_cvc") {
              this.setState({
                paymentMessage: "Form incomplete. Check CVC.",
                processing: false
              });
            }
            // handle default if token.id does not exist (did not create valid Stripe token)
          } else {
            this.setState({
              paymentMessage: "Error creating Stripe token.",
              processing: false
            });
          }
        }
        // display message if no radio button selection has been made
      } else {
        this.setState({
          selectionMessage: "Please choose an option.",
          processing: false
        });
      }
    } catch (error) {
      this.setState({
        selectionMessage: "Error processing payment.",
        processing: false
      });
    }
  }

  render() {
    return (
      <div className="checkout">
        <div className="left-side">
          <div className="purchase-options">
            <form className="options">
              <label>
                <input
                  type="radio"
                  name="unlimited"
                  value="unlimited"
                  checked={this.state.selectedOption === "unlimited"}
                  onChange={this.handleOptionChange}
                />
                {"1 Month Unlimited - $299.99"}
              </label>
              <label>
                <input
                  type="radio"
                  name="job12"
                  value="job12"
                  checked={this.state.selectedOption === "job12"}
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
          </div>
          <span className="selection-message">
            {this.state.selectionMessage || null}
          </span>

          <div className="card-info">
            <div className="card-info-flex">
              <p className="card-info-labels"> Card Number</p>
              <div className="line-card">
                <CardNumberElement
                  className="card-info-placeholder-cnum"
                  onReady={element => (this.cardElement = element)}
                />
              </div>
              <p className="card-info-labels"> Expiration Date</p>
              <div className="line-expiration">
                <CardExpiryElement
                  className="card-info-placeholder-exp"
                  onReady={element => (this.expiryElement = element)}
                />
              </div>
              <p className="card-info-labels"> CVC </p>
              <div className="line-cvc">
                <CardCVCElement
                  className="card-info-placeholder-cvc"
                  onReady={element => (this.cvcElement = element)}
                />
              </div>
            </div>
            <span className="payment-message">
              {this.state.paymentMessage || null}
            </span>

            <div className="button-section">
              <button
                className="purchase-button"
                id="buttonCheckout"
                onClick={this.submit}
                disabled={!this.props.authUser}
              >
                {this.state.processing ? (
                  <img src={Loading} alt="loading" />
                ) : (
                  "Purchase"
                )}
              </button>
              <button
                className="cancel-button"
                onClick={this.updateInput}
                type="button"
              >
                Cancel
              </button>
            </div>

            <img
              src={StripeLogo}
              alt="Powered by Stripe"
              className="powered-by-stripe"
              onClick={() => window.open("https://stripe.com/", "_blank")}
            />
          </div>
        </div>
        <hr className="line" />
        <div className="right-side">
          <UserJobs authUser={this.props.authUser} />
          <Balance authUser={this.props.authUser} />
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
