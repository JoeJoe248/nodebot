import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMyRecipes } from "../../actions/recipeActions";
import { getCurrentProfile } from "../../actions/profileActions";
import GetRecipesItem from "./GetRecipesItem";

class GetRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      profile: {},
      recipes: {}
    };
  }

  componentDidMount() {
    this.setState({
      recipes: this.props.getMyRecipes(),
      profile: this.props.getCurrentProfile()
    });
    console.log("recipes: ", this.state.recipes);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors }); //we are pushing errors to component state to we don't have to change how errors work in the HTML form below
    }
  }

  render() {
    /*render() {
      const { posts } = this.props;
  
      return posts.map(post => <PostItem key={post._id} post={post} />);
    }*/
    const { errors } = this.state;
    //const { profile } = this.state;
    const { recipes } = this.state;

    let myRecipes;
    myRecipes = this.state.recipes.map(recipe => (
      <GetRecipesItem key={recipes._id} recipe={recipe} />
    ));

    /*let myRecipes;
    myRecipes = this.state.recipes.map(recipe => (
      <GetRecipesItem
        recipeName={recipe.recipeName}
        directions1={recipe.directions1}
      />
    ));*/

    return (
      <div>
        <div className="myRecipes">
          <div className="container">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">My Recipes</h1>
                <p className="lead text-center">Here are Your Recipes</p>
              </div>
              {myRecipes}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GetRecipes.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getMyRecipes: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  recipes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  recipes: state.recipes,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getMyRecipes }
)(GetRecipes);
