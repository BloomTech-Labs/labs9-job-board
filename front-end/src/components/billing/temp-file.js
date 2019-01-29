//userjobs.js
{
	this.state.fetching ? (
		<img src={LoadingBar} alt="loading bar" />
	) : this.state.jobs.length ? (
		this.state.jobs.map(job => {
			return (
				<div className="job-links">
					{/* // key={job.id} */}
					<h3>Job Listings:</h3>
					<Link to={`/jobs/${job.id}`}>
						<div className="billing-job">
							{/* {job.title} */}
							Junior Web Developer
						</div>
					</Link>
					<Link to={`/edit-job/${job.id}`}>Edit</Link>
				</div>
			);
		})
	) : (
		<div>{this.state.message}</div>
	);
}

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
