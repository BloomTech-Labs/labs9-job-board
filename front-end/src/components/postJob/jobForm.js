import React from "react";

class JobForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="post-job-container">
        <div className="post-job-header">
          {this.props.pageTitle ? "Edit Job" : "Post a Job"}
          <hr />
        </div>
        <form className="job-form" onSubmit={this.props.submitHandler}>
          <div className="post-job-top">
            <div className="input-container">
              <div className="top">
                <div className="title-and-input">
                  <label className="input-titles" for="title">
                    Title
                  </label>
                  <input
                    id="title"
                    value={this.props.title}
                    name="title"
                    onChange={this.props.handleInput}
                    placeholder="Junior Web Developer"
                  />
                </div>
                <div className="title-and-input">
                  <label className="input-titles" for="salary">
                    Salary
                  </label>
                  <input
                    id="salary"
                    value={this.props.salary}
                    name="salary"
                    onChange={this.props.handleInput}
                    placeholder="$85,000"
                  />
                </div>
              </div>
              <div className="bottom">
                <div className="title-and-input">
                  <label className="input-titles" for="top-skills">
                    Top 5 Skills (largest on your posting) *separate with
                    commas*
                  </label>
                  <input
                    id="top-skills"
                    value={this.props.top_skills}
                    name="top_skills"
                    onChange={this.props.handleInput}
                    placeholder="HTML, CSS, JavaScript"
                  />
                </div>
                <div className="title-and-input">
                  <label className="input-titles" for="additional-skills">
                    More Skills (medium on your posting) *separate with commas*
                  </label>
                  <input
                    id="additional-skills"
                    value={this.props.add_skills}
                    name="add_skills"
                    onChange={this.props.handleInput}
                    placeholder="React, JSON, JSX"
                  />
                </div>
                <div className="title-and-input">
                  <label className="input-titles" for="familiar-with">
                    Remaining Skills (small on your posting) *separate with
                    commas*
                  </label>
                  <input
                    id="familiar-with"
                    value={this.props.familiar}
                    name="familiar"
                    onChange={this.props.handleInput}
                    placeholder="Python, C, C++"
                  />
                </div>
                <div className="title-and-input">
                  <label className="input-titles" for="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={this.props.description}
                    name="description"
                    onChange={this.props.handleInput}
                    placeholder="We are looking for a Junior Developer."
                  />
                </div>
                <div className="title-and-input">
                  <label className="input-titles" for="requirements">
                    Requirements
                  </label>
                  <textarea
                    id="requirements"
                    value={this.props.requirements}
                    name="requirements"
                    onChange={this.props.handleInput}
                    placeholder="You must know how to..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="post-job-bottom">
            <div className="top">
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
                <label className="switch">
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
                  <span class="slider round" />
                </label>
                <h5>This job requires a degree</h5>
              </div>
              <div className="categories">
                <select
                  name="category"
                  onChange={event => {
                    this.props.categoryHandler(event.target);
                  }}
                  value={this.props.category}
                >
                  <option value="none">Category</option>
                  <option value="design">Design</option>
                  <option value="uxui">UX/UI</option>
                  <option value="programming">Programming</option>
                  <option value="management">Management</option>
                  <option value="devops">DevOps</option>
                  <option value="writing">Writing</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
            </div>
            <div className="bottom">
              <div className="post-job-buttons-container">
                <button
                  className="post-job-buttons"
                  id="cancel-button"
                  type="reset"
                  onClick={this.props.handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="post-job-buttons"
                  id="save-button"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default JobForm;
