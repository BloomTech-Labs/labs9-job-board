import React from "react";

//This is the payment modal logic that pops up once a payment has either been successful or if the payment has failed
const PaymentModal = props => {
  return (
    <div
      className={`payment-modal-container${
        props.successVisible
          ? " visible"
          : props.failureVisible
          ? " visible"
          : ""
      }`}
    >
      <div
        className={`payment-modal-card${
          props.successVisible
            ? " visible"
            : props.failureVisible
            ? " visible"
            : ""
        }`}
      >
        <span
          className={`payment-modal-header${
            props.successVisible
              ? " success"
              : props.failureVisible
              ? " failure"
              : ""
          }`}
        >
          {props.successVisible
            ? "PAYMENT SUCCESSFULLY PROCESSED"
            : props.failureVisible
            ? "FAILED TO PROCESS PAYMENT"
            : null}
        </span>
      </div>
    </div>
  );
};

export default PaymentModal;
