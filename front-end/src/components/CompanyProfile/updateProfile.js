import React, { Component } from 'react';
import axios from 'axios';
import ProfileForm from './profileForm';
// import ProfilePic from './profilePic';
import './profileFormStyling.css'

const url = process.env.REACT_APP_DB_URL;

class UpdateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: '',
			email: '',
			firstName: '',
			lastName: '',
			companyName: '',
			companySummary: '',
			applicationInbox: '',
		};
	}

	updateUser = e => {
		e.preventDefault();
		const id = this.props.match.params.id;

		const updatedUser = {
			user_uid: this.state.uid,
      		email: this.state.email,
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			company_name: this.state.companyName,
			summary: this.state.companySummary,
			application_method: this.state.applicationInbox
		};

		axios.put(`${url}/api/users/${id}`, updatedUser).then(res => {
			console.log('response', res);
			this.setState({ user: res.data }).catch(err => console.log(err));
		});
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<div className = 'profile-container'>
				<ProfileForm />
			</div>
		);
	}
}

export default UpdateProfile;
