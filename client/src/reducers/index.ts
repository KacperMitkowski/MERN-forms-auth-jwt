import { combineReducers } from 'redux';
import auth from './auth';
import forms from './forms';
import answers from './answers';
import error from './error';

export const reducers = combineReducers({ auth, forms, answers, error });
