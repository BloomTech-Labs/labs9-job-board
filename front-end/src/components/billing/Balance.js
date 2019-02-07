import React from "react";
import axios from "axios";

import Loading from "../../images/design/png/loading-bar.svg";

const URL = process.env.REACT_APP_DB_URL;

class Balance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: "",
      fetching: false,
      attempted: false
    };
  }
  /* returns and sets in state the users current balance object
  (both integer balance of individual job purchases and valid expiry) */
  fetchBalance() {
    this.setState({ fetching: true, attempted: true }, () => {
      axios
        .get(`${URL}/api/billing/balance/${this.props.authUser.uid}`)
        .then(response => {
          if (response.data.balance) {
            this.setState({ balance: response.data, fetching: false });
          } else {
            this.setState({
              balance: response.data,
              fetching: false
            });
          }
        })
        .catch(error => {
          this.setState({
            message: "Error retrieving jobs",
            fetching: false
          });
        });
    });
  }

  // formats date month/day/year
  formatDate(date) {
    const newDate = new Date(date);
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let year = newDate.getFullYear();

    return `${month}/${day}/${year}`;
  }

  // on mount, if valid authUser then fetch user's balance object
  componentDidMount() {
    if (this.props.authUser) {
      this.fetchBalance();
    }
  }
  // on update, if valid authUser and fetch unattempted then fetch user's balance object
  componentDidUpdate() {
    if (this.props.authUser && !this.state.attempted) {
      this.fetchBalance();
    }
  }

  render() {
    return this.props.authUser ? (
      <div className="billing-balance">
        <h3>Your Balance:</h3>
        {this.state.balance.expiration ? (
          <p>{`Unlimited until ${this.formatDate(
            this.state.balance.expiration
          )}`}</p>
        ) : null}
        <p className={this.state.balance.expiration ? "strikethrough" : ""}>
          {/* if valid expiration, show unlimited until expiry and balance with strikethrough */}
          {typeof this.state.balance.balance === "number"
            ? `${this.state.balance.balance} postings`
            : "N/A"}
        </p>
      </div>
    ) : (
      // before component has access to props to see authenticated user
      <img src={Loading} alt="loading" />
    );
  }
}

export default Balance;
