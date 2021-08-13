import { CREATE, DELETE, DELETE_SUCCESSFUL, END_LOADING, ERROR, FETCH_ALL, FETCH_FORM, START_LOADING, UPDATE, UPDATE_SUCCESSFUL } from "../constants/actionTypes";
import * as api from '../api';

export const getForms = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchForms();
    dispatch({ type: FETCH_ALL, payload: { data } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
}

export const getForm = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchForm(id);

    dispatch({ type: FETCH_FORM, payload: { form: data } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
}

export const createForm = (form, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createForm(form);

    if (data?.error) {
      dispatch({ type: ERROR, data });
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

export const updateForm = (form, history) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateForm(form._id, form);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return history.push(`/editForm/${form._id}`);
    }

    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: UPDATE_SUCCESSFUL, payload: true });
    dispatch({ type: END_LOADING });
    return history.push(`/forms`);
  } catch (error) {
    console.log(error);
  }
}

export const deleteForm = (id, history) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteForm(id);

    dispatch({ type: DELETE, payload: id });
    dispatch({ type: DELETE_SUCCESSFUL, payload: true });
    dispatch({ type: END_LOADING });
    return history.push(`/`);
  } catch (error) {
    console.log(error);
  }
}

