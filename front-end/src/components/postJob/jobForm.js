import React from "react";
import "./PostJobStyling.css";

const JobForm = props => {
  return (
    <div>
      <form className="job-form" onSubmit={props.addJob}>
        <div className="top">
          <div className="title-container">
            <label className="titles" for="job-title">
              Job Title
            </label>
            <label className="titles" for="job-salary">
              Job Salary
            </label>
            <label className="titles" for="job-skills">
              Job Skills
            </label>
          </div>
          <div className="inputs-container">
            <input id="job-title" />
            <input id="job-salary" />
            <input id="job-skills" />
          </div>
        </div>
        {/* <div class="input-container">
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
          <label className="input-titles" for="salary">
            Salary
          </label>
          <input
            id="salary"
            value={props.salary}
            name="salary"
            onChange={props.handleInput}
            placeholder="Salary Range"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="top-skills">
            Top Skills
          </label>
          <input
            id="top-skills"
            value={props.topSkills}
            name="topSkills"
            onChange={props.handleInput}
            placeholder="Top Skills"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="additional-skills">
            Additional Skills
          </label>
          <input
            id="additional-skills"
            value={props.additionalSkills}
            name="additionalSkills"
            onChange={props.handleInput}
            placeholder="Additional Skills"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="familiar-with">
            Familiar With
          </label>
          <input
            id="familiar-with"
            value={props.familiarWith}
            name="familiarWith"
            onChange={props.handleInput}
            placeholder="Remaining Skills"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="description">
            Description
          </label>
          <textarea
            id="description"
            value={props.description}
            name="description"
            onChange={props.handleInput}
            placeholder="Job Description"
          />
        </div>
        <div class="input-container">
          <label className="input-titles" for="requirements">
            Requirements
          </label>
          <textarea
            id="requirements"
            value={props.requirements}
            name="requirements"
            onChange={props.handleInput}
            placeholder="Job Requirements"
          />
        </div> */}
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
