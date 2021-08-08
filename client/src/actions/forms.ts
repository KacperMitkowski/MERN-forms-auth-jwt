import { CREATE, END_LOADING, ERROR, START_LOADING } from "../constants/actionTypes";
import * as api from '../api';

export const createForm = (form, history) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});

        const { data } = await api.createForm(form);

        if(data?.error) {
            dispatch({type: ERROR, data});
            return history.push('/addForm');
        }

        dispatch({ type: END_LOADING });
        dispatch({ type: CREATE, payload: data });
        history.push(`/`);
    }
    catch (error) {
        console.log(error);
      }
}