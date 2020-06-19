import { createAction, ActionType } from 'typesafe-actions';
import { ResponseMessage } from '../../common/types/types';

export const USER_LOGIN = 'auth/USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'auth/USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'auth/USER_LOGIN_ERROR';

export const authActions = {
  userLogin: createAction(USER_LOGIN, (username: string, password: string) => ({ username, password }))<{
    username: string;
    password: string;
  }>(),
  userLoginSuccess: createAction(USER_LOGIN_SUCCESS, (response: ResponseMessage<string>) => ({ response }))<{
    response: ResponseMessage<string>;
  }>(),
  userRegisterError: createAction(USER_LOGIN_ERROR, (error: ResponseMessage<string>) => ({ error }))<{
    error: ResponseMessage<string>;
  }>(),
};

export type AuthActions = ActionType<typeof authActions>;
