//Balance.js

return this.props.authUser ? (
	<div className="balance-balance">
		<h3>
			Your Balance:
			<p>{`${this.state.balance.balance} postings`}</p>
		</h3>
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
