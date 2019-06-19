import { COOK_LOG_LOADING, GET_COOK_LOG } from "../actions/types";

const initialState = {
  cookLog: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COOK_LOG_LOADING:
      return {
        ...state, //current state
        loading: true //all COOK_LOG_LOADING does is make this true
      };
    case GET_COOK_LOG:
      return {
        ...state, //current state
        cookLog: action.payload, //cookLog is filled with payload
        loading: false
      };
    default:
      return state;
  }
}
