import axios from "axios";

import { GET_ERRORS, GET_COOK_LOG, COOK_LOG_LOADING } from "./types";

//add CookEventCookLog status item
export const addCookEventCookLogProbeStart = (
  cookEventCookLogData,
  history
) => dispatch => {
  axios
    .post(
      "/api/cookEventCookLogs/addCookEventLogProbeStart",
      cookEventCookLogData
    )
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

//get my cook event
export const getMyCookLog = cookEventId => dispatch => {
  dispatch(setCookEventCookLogLoading());
  axios
    .get(`api/cookEventCookLogs/myCookEvents/${cookEventId}`)
    .then(res => {
      dispatch({
        type: GET_COOK_LOG,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_COOK_LOG, //don't need to call GET_ERRORS b/c it is not a form
        payload: null //so, set payload to null
      })
    );
};

//get my cook event
export const archiveMyCookEventCookLog = cookEventId => dispatch => {
  dispatch(setCookEventCookLogLoading());
  axios
    .get(`api/cookEventCookLogs/archiveMyCookEventCookLog/${cookEventId}`)
    .then(res => {
      dispatch({
        type: GET_COOK_LOG,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_COOK_LOG, //don't need to call GET_ERRORS b/c it is not a form
        payload: null //so, set payload to null
      })
    );
};

export const unarchiveMyCookEventCookLog = cookEventId => dispatch => {
  dispatch(setCookEventCookLogLoading());
  axios
    .get(`api/cookEventCookLogs/unarchiveMyCookEventCookLog/${cookEventId}`)
    .then(res => {
      dispatch({
        type: GET_COOK_LOG,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_COOK_LOG, //don't need to call GET_ERRORS b/c it is not a form
        payload: null //so, set payload to null
      })
    );
};

export const setCookEventCookLogLoading = () => {
  return {
    type: COOK_LOG_LOADING
  };
};
