import React from "react";


const url = process.env.REACT_APP_DB_URL;

const ProfileForm = props => {
  return (
    <div>
      <form>
        <input
         type="image"
         id="image" 
         alt="Company Profile Photo"
         />
        <div>
          <label>Email</label>
          <input
            id="email"
            placeholder="user@gmail.com"
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            id="firstName"
            placeholder="John"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            id="lastName"
            placeholder="Doe"
          />
        </div>
        <div>
          <label>Company Name</label>
          <input
            id="companyName"
            placeholder="Lambda Technologies"
          />
        </div>
        <div>
          <label>Company Summary</label>
          <textarea
            id="companySummary"
            placeholder="Briefley describe your company for your potential employees"
          />
        </div>
        <div>
          <label>Applications Inbox</label>
          <input
            id="applicationInbox"
            placeholder="apply@company.com"
          />
        </div>
        <button type="submit"> Save </button>
        
      </form>
      <div>
        <p>Old Password</p>
        <p>New Password</p>
        <p>Confirm Password</p>
      </div>
      <button> Billing and Jobs </button>

    </div>
  )
}

export default ProfileForm;
