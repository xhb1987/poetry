import { createAction, ActionType } from 'typesafe-actions';
import { ResponseMessage } from '../../common/types/types';
import {
  USER_LOGIN,
  USER_LOGIN_BY_TOKEN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_OUT_ERROR,
  USER_LOG_OUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
} from 'src/common/rest/actions/authActions';
import { AjaxError } from 'rxjs/ajax';
import { User } from '../user/types';
import { AccessToken } from './types';
import { USER_REGISTER } from '../user/actions';

const CLEAR_ERROR = 'auth/CLEAR_ERROR';

export const authResponseActions = {
  authLoginSuccess: createAction(
    USER_LOGIN_SUCCESS,
    (responseMessage: ResponseMessage<{ user: User; access_token: AccessToken }>) => ({
      user: responseMessage.data.user,
      access_token: responseMessage.data.access_token,
    })
  )<{
    user: User;
    access_token: AccessToken;
  }>(),
  authLoginError: createAction(USER_LOGIN_ERROR, (error: AjaxError) => ({ error }))<{
    error: AjaxError;
  }>(),

  authLogOutSuccess: createAction(USER_LOG_OUT_SUCCESS)(),
  authLogOutError: createAction(USER_LOG_OUT_ERROR, (error: AjaxError) => ({ error }))<{
    error: AjaxError;
  }>(),

  authRegisterSuccess: createAction(
    USER_REGISTER_SUCCESS,
    (responseMessage: ResponseMessage<{ user: User; access_token: AccessToken }>) => ({
      user: responseMessage.data.user,
      access_token: responseMessage.data.access_token,
    })
  )<{
    user: User;
    access_token: AccessToken;
  }>(),
  authRegisterError: createAction(USER_REGISTER_ERROR, (error: AjaxError) => ({ error }))<{
    error: AjaxError;
  }>(),
};

export const authActions = {
  clearError: createAction(CLEAR_ERROR)(),

  userRegister: createAction(USER_REGISTER, (username: string, password: string) => ({
    request: {
      url: 'http://localhost:3001/auth/register',
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
    onSuccess: authResponseActions.authRegisterSuccess,
    onError: authResponseActions.authRegisterError,
  }))(),
  userRegisterSuccess: authResponseActions.authRegisterSuccess,
  userRegisterError: authResponseActions.authRegisterError,

  userLogin: createAction(USER_LOGIN, (username: string, password: string) => ({
    request: {
      url: `http://localhost:3001/auth/login`,
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
    onSuccess: authResponseActions.authLoginSuccess,
    onError: authResponseActions.authLoginError,
  }))(),

  userLoginByToken: createAction(USER_LOGIN_BY_TOKEN, () => ({
    request: {
      url: `http://localhost:3001/auth/login/token`,
      method: 'POST',
    },
    onSuccess: authResponseActions.authLoginSuccess,
    onError: authResponseActions.authLoginError,
  }))(),
  userLoginSuccess: authResponseActions.authLoginSuccess,
  userLoginError: authResponseActions.authLoginError,

  userLogout: createAction(USER_LOG_OUT, () => ({
    request: {
      url: 'http://localhost:3001/auth/logout',
      method: 'POST',
    },
    onSuccess: authResponseActions.authLogOutSuccess,
    onError: authResponseActions.authLogOutError,
  }))(),
  userLogoutSuccess: authResponseActions.authLogOutSuccess,
  userLogoutError: authResponseActions.authLogOutError,
};
