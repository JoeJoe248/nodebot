import { GET_CHECKBOXVALUELABEL, VALUELABEL_LOADING } from "../actions/types";

const initialState = {
  checkBoxValueLabels: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    /*case PROFILE_LOADING:
      return {
        ...state, //current state
        loading: true //all GET_PROFILE does is make this true
      };*/
    case VALUELABEL_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CHECKBOXVALUELABEL:
      return {
        ...state, //current state
        checkBoxValueLabels: action.payload, //checkBoxValueLabels is filled with payload
        loading: false
      };
    default:
      return state;
  }
}
