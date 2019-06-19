import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import recipeReducer from "./recipeReducer";
import cookEventReducer from "./cookEventReducer";
import cookLogReducer from "./cookLogReducer";
import checkBoxValueLabelReducer from "./checkBoxValueLabelReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  recipes: recipeReducer,
  cookEvents: cookEventReducer,
  cookLog: cookLogReducer,
  checkBoxValueLabels: checkBoxValueLabelReducer
});
