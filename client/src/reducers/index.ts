import { combineReducers } from 'redux';
import auth from './auth';
import forms from './forms';
import error from './error';

export const reducers = combineReducers({ auth, forms, error });
