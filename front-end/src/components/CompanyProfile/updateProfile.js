import React, { Component } from "react";
import axios from "axios";
import ProfileForm from "./Profile";

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

    componentDidMount() {
        const id = this.props.match.params.id
        this.getUser(id);
    }

    getUser = id => {
        axios 
            .get(`${url}/api/users/${id}`)
            .then(res => {
                this.setState(() => (res.data))
            })
            .catch(error => console.log(error))
    }

    updateUser = e => {
        e.preventDefault();
        const id = this.props.match.params.id;
        
        const updatedUser = {
            image: this.state.image,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            companyName: this.state.companyName,
            companySummary: this.state.companySummary,
            applicationInbox: this.state.applicationInbox
        }

        axios
        .put(`${url}/api/users/${id}`, updatedUser)
        .then
        .catch
    }
}