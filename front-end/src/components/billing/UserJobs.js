import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import LoadingBar from '../../images/loading-bars.svg';

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

	fetchJobs() {
		this.setState({ fetching: true, attempted: true }, () => {
			axios
				.get(`${URL}/api/jobs/user/${this.props.authUser.uid}`)
				.then(response => {
					if (response.data.length) {
						this.setState({ jobs: response.data, fetching: false });
					} else {
						this.setState({ message: 'No jobs posted', fetching: false });
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

	componentDidMount() {
		if (this.props.authUser) {
			this.fetchJobs();
		}
	}

	componentDidUpdate() {
		if (this.props.authUser && !this.state.attempted) {
			this.fetchJobs();
		}
	}

	render() {
		return (
			<div className="billing-jobs">
				<div className="job-links">
					{/* // key={job.id} */}
					<h3>Your Job Postings:</h3>
					<Link to={`/jobs`}>
						<div className="billing-job">
							{/* {job.title} */}
							Junior Web Developer
						</div>
					</Link>
					<Link to={`/edit-job/`}>Edit</Link>
				</div>
			</div>
		);
	}
}

export default UserJobs;
