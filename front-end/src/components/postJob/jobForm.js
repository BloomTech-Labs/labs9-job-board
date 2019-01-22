import React from "react";
import "./PostJobStyling.css";

const JobForm = props => {
  return (
    <div>
      <form className="job-form" onSubmit={props.addJob}>
        <div className="top">
          <div className="title-container">
            <label className="input-titles" for="title">
              Title
            </label>
            <label className="input-titles" id="salary-title" for="salary">
              Salary
            </label>
            <label
              className="input-titles"
              id="top-skills-title"
              for="top-skills"
            >
              Top Skills
            </label>
            <label
              className="input-titles"
              id="additional-skills-title "
              for="additional-skills"
            >
              Additional Skills
            </label>
            <label
              className="input-titles"
              id="familiar-with-title"
              for="familiar-with"
            >
              Familiar With
            </label>
            <label
              className="input-titles"
              id="description-title"
              for="description"
            >
              Description
            </label>
            <label
              className="input-titles"
              id="requirements-title"
              for="requirements"
            >
              Requirements
            </label>
          </div>
          <div className="input-container">
            <input
              id="title"
              value={props.title}
              name="title"
              onChange={props.handleInput}
              placeholder="Job title"
            />
            <input
              id="salary"
              value={props.salary}
              name="salary"
              onChange={props.handleInput}
              placeholder="Salary range"
            />
            <input
              id="top-skills"
              value={props.topSkills}
              name="topSkills"
              onChange={props.handleInput}
              placeholder="Top 5 skills (largest on your posting) *separate with commas*"
            />
            <input
              id="additional-skills"
              value={props.additionalSkills}
              name="additionalSkills"
              onChange={props.handleInput}
              placeholder="More skills (medium on your posting) *separate with commas*"
            />
            <input
              id="familiar-with"
              value={props.familiarWith}
              name="familiarWith"
              onChange={props.handleInput}
              placeholder="Remaining skills (small on your posting) *separate with commas*"
            />
            <textarea
              id="description"
              value={props.description}
              name="description"
              onChange={props.handleInput}
              placeholder="Job description"
            />
            <textarea
              id="requirements"
              value={props.requirements}
              name="requirements"
              onChange={props.handleInput}
              placeholder="Job requirements"
            />
          </div>
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
