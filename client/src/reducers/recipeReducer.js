import {
  GET_RECIPES,
  GET_RECIPE,
  RECIPE_LOADING,
  ADD_RECIPE
} from "../actions/types";

const initialState = {
  recipes: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    /*case PROFILE_LOADING:
      return {
        ...state, //current state
        loading: true //all GET_PROFILE does is make this true
      };*/
    case RECIPE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RECIPE:
      return {
        ...state, //current state
        recipe: action.payload, //recipe is filled with payload
        loading: false
      };
    case GET_RECIPES:
      return {
        ...state, //current state
        recipes: action.payload, //recipes is filled with payload
        loading: false
      };
    default:
      return state;
  }
}
