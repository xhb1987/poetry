import { createAction, ActionType } from 'typesafe-actions';
import { ProfileReciteCollection, Profile } from './types';

export const USER_REGISTER = 'user/REGISTER';
export const USER_REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'user/REGISTER_ERROR';

export const SELECT_USER_PROFILE = 'user/SELECT_USER_PROFILE';
export const SELECT_USER_PROFILE_RECITE_COLLECTION = 'user/SELECT_USER_PROFILE_RECITE_COLLECTION';

export const userActions = {
  userRegister: createAction(USER_REGISTER, (username: string, password: string) => ({ username, password }))<{
    username: string;
    password: string;
  }>(),
  userRegisterSuccess: createAction(USER_REGISTER_SUCCESS, (response: any) => ({ response }))<{
    response: any;
  }>(),
  userRegisterError: createAction(USER_REGISTER_ERROR, (error: any) => ({ error }))<{ error: any }>(),

  selectUserProfileReciteCollection: createAction(
    SELECT_USER_PROFILE_RECITE_COLLECTION,
    (collection: ProfileReciteCollection) => ({
      collection,
    })
  )<{ collection: ProfileReciteCollection }>(),
};

export type UserActions = ActionType<typeof userActions>;
