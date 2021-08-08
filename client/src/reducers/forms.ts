import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_MOVIE, CREATE, FETCH_BY_SEARCH, UPDATE, DELETE, DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL, COMMENT } from '../constants/actionTypes';

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
        case CREATE:
            return { ...state, forms: [...state.forms, action.payload] };
        default:
            return state;
    }
} 