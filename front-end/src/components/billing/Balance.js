import React from "react";
import axios from "axios";

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

  formatDate(date) {
    const newDate = new Date(date);
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let year = newDate.getFullYear();

    return `${month}/${day}/${year}`;
  }

  componentDidMount() {
    if (this.props.authUser) {
      this.fetchBalance();
    }
  }

  componentDidUpdate() {
    if (this.props.authUser && !this.state.attempted) {
      this.fetchBalance();
    }
  }

  render() {
    return (
      <div className="billing-balance">
        <h3>
          Your Balance:
          <p>10 postings</p>
        </h3>
      </div>
    );
  }
}

export default Balance;
