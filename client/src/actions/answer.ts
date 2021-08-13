import { ADD_ANSWER_SUCCESSFUL, END_LOADING, ERROR, GET_ANSWERS, START_LOADING } from "../constants/actionTypes";
import * as api from '../api';

export const getAnswers = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAnswers(id);
    dispatch({ type: GET_ANSWERS, payload: data });
    return data;
  }
  catch (error) {
    console.log(error);
  }
}

export const addAnswer = (formAnswer, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.addAnswer(formAnswer);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return history.push(`/answerForm/${formAnswer.formId}`);
    }

    dispatch({ type: ADD_ANSWER_SUCCESSFUL, payload: true });
    dispatch({ type: END_LOADING });
    return history.push(`/forms`);
  } catch (error) {
    console.log(error);
  }
}