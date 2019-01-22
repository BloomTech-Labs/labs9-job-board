import React from "react";
import "./PostJobStyling.css";

const JobForm = props => {
  return (
    <div>
      <form class="job-form" onSubmit={props.addJob}>
        <div class="input-container">
          <label className="input-titles" for="title">
            Title
          </label>
          <input
            id="title"
            value={props.title}
            name="title"
            onChange={props.handleInput}
            placeholder="Job Title"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="">
            Salary
          </label>
          <input
            value={props.salary}
            name="salary"
            onChange={props.handleInput}
            placeholder="Salary Range"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="">
            Top Skills
          </label>
          <input
            value={props.topSkills}
            name="topSkills"
            onChange={props.handleInput}
            placeholder="Top Skills"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="">
            AdditionalSkills
          </label>
          <input
            value={props.additionalSkills}
            name="additionalSkills"
            onChange={props.handleInput}
            placeholder="Additional Skills"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="">
            Familiar With
          </label>
          <input
            value={props.familiarWith}
            name="familiarWith"
            onChange={props.handleInput}
            placeholder="Remaining Skills"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="">
            Description
          </label>
          <textarea
            value={props.description}
            name="description"
            onChange={props.handleInput}
            placeholder="Job Description"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="">
            Requirements
          </label>
          <textarea
            value={props.requirements}
            name="requirements"
            onChange={props.handleInput}
            placeholder="Job Requirements"
          />
        </div>
        <h5>Active</h5>
        <input type="checkbox" name="active" value={props.active} />
        <h5>This requires a degree</h5>
        <input
          type="checkbox"
          name="requiresDegree"
          value={props.requiresDegree}
        />
        <button type="reset" onClick={props.handleInput}>
          Cancel
        </button>
        <button type="submit" onClick={props.handleInput}>
          Save
        </button>
      </form>
    </div>
  );
};

export default JobForm;
