import React from "react";
import seachFilter from "../../images/design/png/filter-button.png";

// default/reset state
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
      finance: false,
      toggleDisplay: true
    };
    this.toggleHandler = this.toggleHandler.bind(this);
    this.toggleSetter = this.toggleSetter.bind(this);
  }

  clickHandler = event => {
    this.props.searchByCategory(event.target.dataset.tab);

    // const reset = Object.assign({...RESET_STATE, [event.target.dataset.tab]: true})

    this.setState({ ...RESET_STATE, [event.target.dataset.tab]: true });
  };
  componentDidMount() {
    window.addEventListener("resize", this.toggleSetter);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.toggleSetter);
  }

  toggleSetter() {
    let windowSize = window.innerWidth;
    if (windowSize >= 500) {
      this.setState({
        toggleDisplay: true
      });
    } else {
      this.setState({
        toggleDisplay: false
      });
    }
  }
  toggleHandler = event => {
    this.setState(state => ({
      toggleDisplay: !state.toggleDisplay
    }));
  };

  render() {
    return (
      <div className="catagory-container">
        <img
          className="filter-button"
          alt="search filter button"
          src={seachFilter}
          onClick={this.toggleHandler}
        />
        <p className="catagory-label">Search Catagories</p>
        <div
          className={
            this.state.toggleDisplay ? "categories" : " categories-hide"
          }
        >
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
              this.state.management
                ? "categories-tab selected"
                : "categories-tab"
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
