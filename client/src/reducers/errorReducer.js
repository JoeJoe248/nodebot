import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload; //payload will include the errors object.  just putting it in the redux state
    default:
      return state;
  }
}
