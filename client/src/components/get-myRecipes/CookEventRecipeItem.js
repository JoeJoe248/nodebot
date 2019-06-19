import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
//import CreateCookEvent from "../create-cookEvent/CreateCookEvent";
//import isEmpty from "../../validation/is-empty";

class CookEventRecipeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeName: "",
      directions1: "",
      directions2: "",
      suggestedWood: [],
      recipeURL: "",
      suggestedTime: "",
      errors: {}
    };
  }
  render() {
    const { recipe } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{recipe._id}</h3>
            <h3>{recipe.recipeName}</h3>
            <h5>{recipe.recipeURL}</h5>
            <p>{recipe.directions1}</p>
            <p>{recipe.directions2}</p>
            <p>{recipe.suggestedTime}</p>
            <p>{recipe.suggestedWood}</p>
          </div>
        </div>
      </div>
    );
  }
}

CookEventRecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipes.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  null
)(CookEventRecipeItem);
