import React from "react";

const JobForm = props => {
  return (
    <div className="post-job-container">
      <div className="post-job-title">Post a Job</div>
      <hr />
      <form className="job-form" onSubmit={props.addJob}>
        <div className="post-job-top">
          <div className="title-container">
            <label
              className="input-titles"
              id="job-title-input-title"
              for="title"
            >
              Title
            </label>
            <label className="input-titles" for="salary">
              Salary
            </label>
            <label className="input-titles" for="top-skills">
              Top Skills
            </label>
            <label className="input-titles" for="additional-skills">
              Additional Skills
            </label>
            <label className="input-titles" for="familiar-with">
              Familiar With
            </label>
            <label className="input-titles" for="description">
              Description
            </label>
            <label
              className="input-titles"
              id="requirements-input-title"
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
        <div className="post-job-bottom">
          <div className="job-active">
            <label className="switch">
              <input
                type="checkbox"
                name="active"
                value={props.active}
                onClick={props.jobActiveToggle}
              />
              <span class="slider round" />
            </label>
            <h5>Active</h5>
          </div>
          <div className="requires-degree">
            <input
              type="checkbox"
              name="requiresDegree"
              className="degree-checkbox"
              value={props.requiresDegree}
              onClick={props.requiresDegreeToggle}
            />
            <h5>This job requires a degree</h5>
          </div>
          <div className="post-job-buttons-container">
            <button
              className="post-job-buttons"
              type="reset"
              onClick={props.handleInput}
            >
              Cancel
            </button>
            <button
              className="post-job-buttons"
              type="submit"
              onClick={props.handleInput}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
