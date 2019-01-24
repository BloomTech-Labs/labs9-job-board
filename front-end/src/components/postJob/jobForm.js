import React from "react";

class JobForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="post-job-container">
        <div className="post-job-title">
          {this.props.pageTitle ? "Edit Job" : "Post a Job"}
        </div>
        <hr />
        <form className="job-form" onSubmit={this.props.submitHandler}>
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
                value={this.props.title}
                name="title"
                onChange={this.props.handleInput}
                placeholder="Job title"
              />
              <input
                id="salary"
                value={this.props.salary}
                name="salary"
                onChange={this.props.handleInput}
                placeholder="Salary range"
              />
              <input
                id="top-skills"
                value={this.props.top_skills}
                name="top_skills"
                onChange={this.props.handleInput}
                placeholder="Top 5 skills (largest on your posting) *separate with commas*"
              />
              <input
                id="additional-skills"
                value={this.props.add_skills}
                name="add_skills"
                onChange={this.props.handleInput}
                placeholder="More skills (medium on your posting) *separate with commas*"
              />
              <input
                id="familiar-with"
                value={this.props.familiar}
                name="familiar"
                onChange={this.props.handleInput}
                placeholder="Remaining skills (small on your posting) *separate with commas*"
              />
              <textarea
                id="description"
                value={this.props.description}
                name="description"
                onChange={this.props.handleInput}
                placeholder="Job description"
              />
              <textarea
                id="requirements"
                value={this.props.requirements}
                name="requirements"
                onChange={this.props.handleInput}
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
                  className="degree-checkbox"
                  onChange={this.props.jobActiveToggle}
                  checked={this.props.active}
                  id="toggle-slider"
                />
                <span class="slider round" />
              </label>
              <h5>Active</h5>
            </div>
            <div className="requires-degree">
              <input
                type="checkbox"
                name="college_degree"
                className="degree-checkbox"
                onChange={
                  this.props.requiresDegreeToggle // value={this.props.requiresDegree}
                }
                id="checkbox-input"
                checked={this.props.college_degree}
              />
              <h5>This job requires a degree</h5>
            </div>
            <div className="post-job-buttons-container">
              <button
                className="post-job-buttons"
                type="reset"
                onClick={this.props.handleCancel}
              >
                Cancel
              </button>
              <button className="post-job-buttons" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default JobForm;
