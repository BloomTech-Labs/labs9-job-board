//Balance.js

return this.props.authUser ? (
	<div className="balance-container">
		<span>Balance:</span>
		{this.state.balance.expiration
			? `Unlimited until ${this.formatDate(this.state.balance.expiration)}`
			: ''}
		<span className={this.state.balance.expiration ? 'strikethrough' : ''}>
			{`${this.state.balance.balance} postings`}
		</span>
	</div>
) : (
	<div>Loading...</div>
);
