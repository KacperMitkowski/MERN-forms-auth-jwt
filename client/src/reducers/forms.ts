import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_FORM, CREATE, UPDATE, DELETE, DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL } from '../constants/actionTypes';

export default (state = { isLoading: true, forms: [] }, action: any) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                forms: action.payload.data,
            };
        case FETCH_FORM:
            return { ...state, form: action.payload.form };
        case CREATE:
            return { ...state, forms: [...state.forms, action.payload] };
        case UPDATE_SUCCESSFUL:
            return { ...state, updateSuccessful: action?.payload };
        case DELETE:
            return { ...state, movies: state.forms.filter((form) => form._id !== action.payload) };
        case DELETE_SUCCESSFUL:
            return { ...state, deleteSuccessful: action?.payload };
        default:
            return state;
    }
}