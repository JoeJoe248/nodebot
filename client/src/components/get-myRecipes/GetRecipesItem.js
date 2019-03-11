import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import CreateCookEvent from "../create-cookEvent/CreateCookEvent";
//import isEmpty from "../../validation/is-empty";

class GetRecipesItem extends Component {
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
            <Link
              to={"/create-cookEvent/" + recipe._id}
              className="btn btn-info"
            >
              Start Cooking
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

GetRecipesItem.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default GetRecipesItem;
