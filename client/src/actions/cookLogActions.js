import axios from "axios";

import { GET_COOK_LOG, COOK_LOG_LOADING } from "./types";

//get my cook logs
export const getMyCookLog = () => dispatch => {
  dispatch(setCookLogLoading());
  axios
    .get("/api/cookLogs/myCookLog")
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

//get my cook logs
export const getActiveMeatProbe = (cookEventData, history) => dispatch => {
  dispatch(setCookLogLoading());
  axios
    .get("/api/cookLogs/cookLogActivate")
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_COOK_LOG, //don't need to call GET_ERRORS b/c it is not a form
        payload: null //so, set payload to null
      })
    );
};

//set loading state
export const setCookLogLoading = () => {
  return {
    type: COOK_LOG_LOADING
  };
};
