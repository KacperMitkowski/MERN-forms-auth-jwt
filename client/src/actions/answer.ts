import { END_LOADING, START_LOADING } from "../constants/actionTypes";
import * as api from '../api';

export const addAnswer = (formAnswer, history) => async (dispatch: any) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.addAnswer(formAnswer);
      console.log(data);
  
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  }