import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state, //current state
        loading: true //all GET_PROFILE does is make this true
      };
    case GET_PROFILE:
      return {
        ...state, //current state
        profile: action.payload, //profile is filled with payload
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state, //current state
        profiles: action.payload, //profiles is filled with payload
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
