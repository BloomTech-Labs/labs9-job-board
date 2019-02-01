import React from 'react';
import axios from 'axios';

const URL = process.env.REACT_APP_DB_URL;

class Balance extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			balance: '',
			fetching: false,
			attempted: false,
		};
	}
	// Collects the balance of an Auth User once they have made a successful payment to post a job
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
							fetching: false,
						});
					}
				})
				.catch(error => {
					this.setState({
						message: 'Error retrieving jobs',
						fetching: false,
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
	// Gives the balance currently
	componentDidMount() {
		if (this.props.authUser) {
			this.fetchBalance();
		}
	}
	// When a payment has been made additional credits will be updated to current balance
	componentDidUpdate() {
		if (this.props.authUser && !this.state.attempted) {
			this.fetchBalance();
		}
	}

	render() {
		return this.props.authUser ? (
			<div className="billing-balance">
				<h3>
					Your Balance:
					<p className={this.state.balance.expiration ? 'strikethrough' : ''}>
						{`${this.state.balance.balance} postings`}
					</p>
				</h3>
				{this.state.balance.expiration
					? `Unlimited until ${this.formatDate(this.state.balance.expiration)}`
					: ''}
			</div>
		) : (
			<div>Loading...</div>
		);
	}
}

export default Balance;
