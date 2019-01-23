import React from "react";
import ProfilePic from './profilePic';
import { Link } from "react-router-dom";



const ProfileForm = props => {
  return (
    <div className = 'update-profile-page'>
      <form className = 'update-profile-form'>
        
          <label className = 'labels' >First Name</label>
          <input className = 'update-input'
            id="firstName"
            placeholder="John"
          />
        
        
          <label className = 'labels'>Last Name</label>
          <input className = 'update-input'
            id="lastName"
            placeholder="Doe"
          />
        
        
          <label className = 'labels'>Email</label>
          <input className = 'update-input'
            id="email"
            placeholder="user@gmail.com"
          />
        
        
          <label className = 'labels'>Company Name</label>
          <input className = 'update-input'
            id="companyName"
            placeholder="Lambda Technologies"
          />
      
        
          <label className = 'labels'>Company Summary</label>
          <textarea 
            className = 'companyUpdateSummaryHolder'
            id="companySummary"
            placeholder="Briefley describe your company for your potential employees"
          />
        
        
          <label className = 'labels'>Applications Inbox</label>
          <input className = 'update-input'
            id="applicationInbox"
            placeholder="apply@company.com"
          />
        
        <button className ='update-profile-save-button' type="submit"> Save </button>
        
      </form>
      <div className = "right-sidebar">
        <ProfilePic />
        <button className ='update-password right-button'>Change Password </button>
        <Link to ='/billing' className ='right-button'>Billing and Jobs</Link> 
      </div>
      

    </div>
  )
}

export default ProfileForm;
