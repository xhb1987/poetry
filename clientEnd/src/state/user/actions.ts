import { createAction, ActionType } from 'typesafe-actions';

export const USER_REGISTER = 'user/REGISTER';
export const USER_REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'user/REGISTER_ERROR';

export const userActions = {
  userRegister: createAction(USER_REGISTER, (username: string, password: string) => ({ username, password }))<{
    username: string;
    password: string;
  }>(),
  userRegisterSuccess: createAction(USER_REGISTER_SUCCESS, (response: any) => ({ response }))<{ response: any }>(),
  userRegisterError: createAction(USER_REGISTER_ERROR, (error: any) => ({ error }))<{ error: any }>(),
};

export type UserActions = ActionType<typeof userActions>;
