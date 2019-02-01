import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import LoadingBar from '../../images/loading-bars.svg';

// Url Variable
const URL = process.env.REACT_APP_DB_URL;

class UserJobs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jobs: [],
			fetching: false,
			message: '',
			attempted: false,
		};
	}
	//logic to fetch jobs that was purchased by the Auth User from the db
	fetchJobs() {
		this.setState({ fetching: true, attempted: true }, () => {
			axios
				.get(`${URL}/api/jobs/user/${this.props.authUser.uid}`)
				.then(response => {
					//lists out the jobs of auth user in the db
					if (response.data.length) {
						this.setState({ jobs: response.data, fetching: false });
						//no jobs will be if none exists in the db
					} else {
						this.setState({ message: 'No jobs posted', fetching: false });
					}
				})
				//catching error
				.catch(error => {
					this.setState({
						message: 'Error retrieving jobs',
						fetching: false,
					});
				});
		});
	}
	//if the auth user did have purchased post job credits then that list of job will be displayed
	componentDidMount() {
		if (this.props.authUser) {
			this.fetchJobs();
		}
	}
	//update the jobs if credits were purchases attempted
	componentDidUpdate() {
		if (this.props.authUser && !this.state.attempted) {
			this.fetchJobs();
		}
	}

	// if there are jobs in the auth user that was purchased, those jobs (mapped) will then be rendered on the billing page where they can view those postings and update those postings and add new job listing
	render() {
		return (
			<div className="billing-jobs">
				<h3>Your Job Postings:</h3>
				<div className="job-links">
					{this.state.fetching ? (
						<img src={LoadingBar} alt="loading bar" />
					) : this.state.jobs.length ? (
						this.state.jobs.map(job => {
							return (
								<div className="each-job">
									<Link
										className="job-name"
										to={`/jobs/${job.id}`}
										key={job.id}
									>
										{job.title}
									</Link>
									<Link className="edit-icon" to={`/edit-job/${job.id}`}>
										<i class="fas fa-edit" />
									</Link>
								</div>
							);
						})
					) : (
						<div>{this.state.message}</div>
					)}
				</div>
			</div>
		);
	}
}

export default UserJobs;
