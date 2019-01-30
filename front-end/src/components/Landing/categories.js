import React from "react";

const RESET_STATE = {
  all: false,
  design: false,
  uxui: false,
  programming: false,
  management: false,
  devops: false,
  writing: false,
  finance: false
};

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all: true,
      design: false,
      uxui: false,
      programming: false,
      management: false,
      devops: false,
      writing: false,
      finance: false
    };
  }

  clickHandler = event => {
    this.props.searchByCategory(event.target.dataset.tab);

    // const reset = Object.assign({...RESET_STATE, [event.target.dataset.tab]: true})

    this.setState({ ...RESET_STATE, [event.target.dataset.tab]: true });
  };

  render() {
    return (
      <div className = 'catagory-container'>
        <p className = 'catagory-label'>Search Catagories</p>
        <div className="categories">
        
          <div
            className={
              this.state.all ? "categories-tab selected" : "categories-tab"
            }
            data-tab="all"
            onClick={this.clickHandler}
          >
            All
          </div>
          <div
            className={
              this.state.design ? "categories-tab selected" : "categories-tab"
            }
            data-tab="design"
            onClick={this.clickHandler}
          >
            Design
          </div>
          <div
            className={
              this.state.uxui ? "categories-tab selected" : "categories-tab"
            }
            data-tab="uxui"
            onClick={this.clickHandler}
          >
            UX/UI
          </div>
          <div
            className={
              this.state.programming
                ? "categories-tab selected"
                : "categories-tab"
            }
            data-tab="programming"
            onClick={this.clickHandler}
          >
            Programming
          </div>
          <div
            className={
              this.state.management ? "categories-tab selected" : "categories-tab"
            }
            data-tab="management"
            onClick={this.clickHandler}
          >
            Management
          </div>
          <div
            className={
              this.state.devops ? "categories-tab selected" : "categories-tab"
            }
            data-tab="devops"
            onClick={this.clickHandler}
          >
            DevOps
          </div>
          <div
            className={
              this.state.writing ? "categories-tab selected" : "categories-tab"
            }
            data-tab="writing"
            onClick={this.clickHandler}
          >
            Writing
          </div>
          <div
            className={
              this.state.finance ? "categories-tab selected" : "categories-tab"
            }
            data-tab="finance"
            onClick={this.clickHandler}
          >
            Finance
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;
