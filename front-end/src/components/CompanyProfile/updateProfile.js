import React, { Component } from "react";
import axios from "axios";
import ProfileForm from "./profileForm";

const url = process.env.REACT_APP_DB_URL;

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
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
                this.setState(() => ({user:res.data}))
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
        .then(res => {
            console.log('response', res)
            this.setState({ user: res.data })
        .catch( err => console.log(err))
        })
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      render() {
          return(
              <div>
                  <p>{this.state}</p>
              </div>
          )
      }
}