import axios from "axios";

import { GET_ERRORS, GET_COOK_EVENTS, COOK_EVENT_LOADING } from "./types";

//create cook events
export const createCookEvent = (cookEventData, history) => dispatch => {
  axios
    .post("/api/cookEvents/", cookEventData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get my cook events
export const getMyCookEvents = () => dispatch => {
  dispatch(setCookEventLoading());
  axios
    .get("/api/cookEvents/myCookEvents")
    .then(res => {
      dispatch({
        type: GET_COOK_EVENTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_COOK_EVENTS, //don't need to call GET_ERRORS b/c it is not a form
        payload: null //so, set payload to null
      })
    );
};

//set loading state
export const setCookEventLoading = () => {
  return {
    type: COOK_EVENT_LOADING
  };
};
