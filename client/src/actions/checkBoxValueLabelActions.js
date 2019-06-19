import axios from "axios";

import { GET_CHECKBOXVALUELABEL, VALUELABEL_LOADING } from "./types";

//get checkbox value labels
export const getActiveCookEventLabel = () => dispatch => {
  dispatch(setValueLabelLoading());
  axios
    .get("/api/checkBoxValueLabels/activeCookEventValueLabels")
    .then(res => {
      dispatch({
        type: GET_CHECKBOXVALUELABEL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_CHECKBOXVALUELABEL, //don't need to call GET_ERRORS b/c it is not a form
        payload: null //so, set payload to null
      })
    );
};

//set loading state
export const setValueLabelLoading = () => {
  return {
    type: VALUELABEL_LOADING
  };
};
