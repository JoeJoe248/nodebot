import axios from "axios";

import {
  GET_RECIPES,
  GET_RECIPE,
  //ADD_RECIPE,
  //DELETE_RECIPE,
  GET_ERRORS,
  RECIPE_LOADING
} from "./types";

//create recipe
export const createRecipe = (recipeData, history) => dispatch => {
  axios
    .post("/api/recipes", recipeData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get my recipes
export const getMyRecipes = () => dispatch => {
  dispatch(setRecipeLoading());
  axios
    .get("/api/recipes/myRecipes")
    .then(res => {
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_RECIPES, //don't need to call GET_ERRORS b/c it is not a form
        payload: null //so, set payload to null
      })
    );
};

//get my recipes
export const getMyRecipe = id => dispatch => {
  dispatch(setRecipeLoading());
  axios
    .get(`/api/recipes/myRecipe/${id}`)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPE,
        payload: null
      })
    );
};

//set loading state
export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};
