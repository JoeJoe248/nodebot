import {
  COOK_EVENT_LOADING,
  GET_COOK_EVENTS,
  GET_COOK_EVENT
} from "../actions/types";

const initialState = {
  cookEvents: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COOK_EVENT_LOADING:
      return {
        ...state, //current state
        loading: true //all COOK_EVENT_LOADING does is make this true
      };
    case GET_COOK_EVENTS:
      return {
        ...state, //current state
        cookEvents: action.payload, //cookEvents is filled with payload
        loading: false
      };
    case GET_COOK_EVENT:
      return {
        ...state, //current state
        cookEvent: action.payload, //cookEvent is filled with payload
        loading: false
      };
    default:
      return state;
  }
}
