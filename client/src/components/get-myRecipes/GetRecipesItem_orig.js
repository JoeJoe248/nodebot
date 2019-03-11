import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class GetRecipesItem extends Component {
  //each field has to have its own component state plus errors
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      recipes: {}
    };
    console.log("this.props:", this.props);
  }

  render() {
    const { recipes } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{this.props.recipes.recipeName}</h3>
            <p>{this.props.recipes.directions1}</p>
            <Link to="" className="btn btn-info">
              Go Somewhere
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

GetRecipesItem.propTypes = {
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(mapStateToProps)(GetRecipesItem);
