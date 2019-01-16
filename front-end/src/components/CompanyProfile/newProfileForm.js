import React, { Component } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_DB_URL;

class NewProfileForm extends Component {
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
        }
    }

    addNew = e => {
        e.preventDefault();
        
        const newUser = {
            image: this.state.image,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            companyName: this.state.companyName,
            companySummary: this.state.companySummary,
            applicationInbox: this.state.applicationInbox
        }

        axios
            .post(`${url}/users`, newUser)
            .then(res => {
                console.log('ADDING USER', res);
                // => not sure what to set this to----this.setState
            })
            .catch(error => {
                console.log('ERROR', error)
            })
    }

    handleInputChange = event => {
        this.setState ({ [event.target.name]: event.target.value});
    };

    render() {
        return (
            <div>
                <form className ='createNewUser' onSubmit = {this.addNew}>
                    <h2 > New User Information </h2>
                    <input
                        type = 'image'
                        className = 'imageHolder'
                        onChange = {this.handleInputChange} 
                        placeholder = 'User Image'
                        value = {this.state.image}
                        name = 'image'
                        />
                    <input
                        type = 'text'
                        className = 'emailHolder'
                        onChange = {this.handleInputChange} 
                        placeholder = 'Email'
                        value = {this.state.email}
                        name = 'email'
                        />
                    <input
                        type = 'text'
                        className = 'firstNameHolder'
                        onChange = {this.handleInputChange} 
                        placeholder = 'First Name'
                        value = {this.state.firstName}
                        name = 'firstName'
                    />
                    <input
                        type = 'text'
                        className = 'lastNameHolder'
                        onChange = {this.handleInputChange} 
                        placeholder = 'Last Name'
                        value = {this.state.lastName}
                        name = 'lastName'
                    />
                    <input
                        type = 'text'
                        className = 'companyNameHolder'
                        onChange = {this.handleInputChange} 
                        placeholder = 'Company Name'
                        value = {this.state.companyName}
                        name = 'companyName'
                    />
                    <input
                        type = 'textarea'
                        className = 'companySummaryHolder'
                        onChange = {this.handleInputChange} 
                        placeholder = 'Company Summary'
                        value = {this.state.companyName}
                        name = 'companyName'
                    />
                    <input
                        type = 'text'
                        className = 'applicationInboxHolder'
                        onChange = {this.handleInputChange} 
                        placeholder = 'Application Inbox'
                        value = {this.state.applicationInbox}
                        name = 'applicationInbox'
                    />
                    
                    <button type = 'submit'>Save</button>
                </form>
            </div>
        )
    }

}

export default NewProfileForm;