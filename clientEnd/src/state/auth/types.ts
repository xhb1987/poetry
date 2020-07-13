import { ActionType, StateType } from 'typesafe-actions';
import { authActions } from './actions';
import { authReducer } from './reducer';

export const AccessTokenKey = 'accessTokenKey';

export type AccessToken = string;
export type AuthActions = ActionType<typeof authActions>;

export type AuthState = StateType<typeof authReducer>;

export type AuthRootAction = AuthActions;
export type AuthRootState = AuthState;
