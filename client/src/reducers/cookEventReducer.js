import { COOK_EVENT_LOADING, GET_COOK_EVENTS } from "../actions/types";

const initialState = {
  cookEvents: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    /*case PROFILE_LOADING:
      return {
        ...state, //current state
        loading: true //all GET_PROFILE does is make this true
      };*/
    case GET_COOK_EVENTS:
      return {
        ...state, //current state
        cookEvents: action.payload, //cookEvents is filled with payload
        loading: false
      };
    default:
      return state;
  }
}
