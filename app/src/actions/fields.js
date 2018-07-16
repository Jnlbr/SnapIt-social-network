import {
   UPDATE_USER_REQUEST,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_FAILURE,
} from '../constants/fields';

import fetchUpdateField from '../api/updateField';
import fetchUpdatePhoto from '../api/updatePhoto';

import { setUser } from './auth';

export function updateField(form) {
  return async (dispatch, getState) => {
    dispatch(updateRequest())
    try {
      const { auth: { token } } = getState();         
      const user = await fetchUpdateField(form, token);
      if(user) {
        dispatch(updateSuccess(user));
        dispatch(setUser(user));
      }
    } catch(err) {
      dispatch(updateFailure(err));
    }
  }
}

export function updatePhoto(photo) {
  return async (dispatch,getState) => {
    dispatch(updateRequest());
    try {
        const token = getState().auth.token;
        console.log(token);
        const user = await fetchUpdatePhoto(photo,token);
        if(user) {
          dispatch(updateSuccess());
          dispatch(setUser(user));
        }
    } catch(err) {
        dispatch(updateFailure(err));
    }
  }
}


const updateRequest = () => {
   return {
      type: UPDATE_USER_REQUEST
   }
}
const updateSuccess = () => {
   return {
      type: UPDATE_USER_SUCCESS,
   }
}
const updateFailure = (error) => {
   return {
      type: UPDATE_USER_FAILURE,
      error
   }
}