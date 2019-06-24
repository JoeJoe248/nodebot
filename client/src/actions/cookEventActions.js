import axios from "axios";

import {
  GET_ERRORS,
  GET_COOK_EVENTS,
  GET_COOK_EVENT,
  COOK_EVENT_LOADING
} from "./types";

//create cook events
export const createCookEvent = (cookEventData, history) => dispatch => {
  axios
    .post("/api/cookEvents/createCookEvent", cookEventData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//edit cook events
export const editCookEvent = (cookEventData, history) => dispatch => {
  axios
    .post("/api/cookEvents/editCookEvent", cookEventData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//edit cook events
export const updateCookEventMeatProbeActive = (
  cookEventData,
  history
) => dispatch => {
  axios
    .post("/api/cookEvents/updateCookEventMeatProbeActive", cookEventData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

//edit cook events to turn prove to not active
export const updateCookEventMeatProbeNotActive = (
  cookEventData,
  history
) => dispatch => {
  axios
    .post("/api/cookEvents/updateCookEventMeatProbeNotActive", cookEventData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

//create cook events
/*export const editCookEvent = (cookEventData, history) => dispatch => {
  axios
    .post("/api/cookEvents/", cookEventData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};*/

//get my active cook events
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

//get my non active cook events history
export const getMyCookEventHistory = () => dispatch => {
  dispatch(setCookEventLoading());
  axios
    .get("/api/cookEvents/myCookEventHistory")
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

//get my active cook event
export const getMyCookEvent = cookEventId => dispatch => {
  dispatch(setCookEventLoading());
  axios
    .get(`/api/cookEvents/myCookEvents/${cookEventId}`)
    .then(res => {
      dispatch({
        type: GET_COOK_EVENT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_COOK_EVENT, //don't need to call GET_ERRORS b/c it is not a form
        payload: null //so, set payload to null
      })
    );
};

//get my non active cook event
export const getMyCookEventItemHistory = cookEventId => dispatch => {
  dispatch(setCookEventLoading());
  axios
    .get(`/api/cookEvents/myCookEventHistory/${cookEventId}`)
    .then(res => {
      dispatch({
        type: GET_COOK_EVENT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_COOK_EVENT, //don't need to call GET_ERRORS b/c it is not a form
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
