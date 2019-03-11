import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import GetRecipesItem from "./GetRecipesItem";
import { getMyRecipes } from "../../actions/recipeActions";

class GetRecipes extends Component {
  componentDidMount() {
    this.props.getMyRecipes();
    console.log("recipes: ", this.props.recipes);
  }

  render() {
    const { recipes, loading } = this.props.recipes;
    let recipeItems;

    if (recipes === null || loading) {
      recipeItems = <Spinner />;
    } else {
      if (recipes.length > 0) {
        recipeItems = recipes.map(recipe => (
          <GetRecipesItem key={recipe._id} recipe={recipe} />
        ));
      } else {
        recipeItems = <h4>No recipes found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <Link to="/dashboard" className="btn-btn-light">
              Go Back
            </Link>
            <div className="col-md-12">
              <h1 className="lead text-center">Here are your recipes</h1>
            </div>
            {recipeItems}
          </div>
        </div>
      </div>
    );
  }
}

GetRecipes.propTypes = {
  getMyRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getMyRecipes }
)(GetRecipes);
