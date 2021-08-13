import { ADD_ANSWER_SUCCESSFUL, GET_ANSWERS } from '../constants/actionTypes';

export default (state = [], action: any) => {
    switch (action.type) {
        case GET_ANSWERS:
            return { ...state, answers: action.payload };
        case ADD_ANSWER_SUCCESSFUL:
            return { ...state, addAnswerSuccessful: action?.payload };
        default:
            return state;
    }
}