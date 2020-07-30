import { User } from './types';
import { UserActions, userActions } from './actions';
import { getType, StateType } from 'typesafe-actions';
import { AuthActions } from '../auth/types';
import { authActions } from '../auth/actions';

type UserReducer = User & {
  loading: boolean;
  error: boolean;
};

const initUserState: UserReducer = {
  username: '',
  loading: false,
  error: false,
};

export const userReducer = (state: UserReducer = initUserState, action: UserActions | AuthActions) => {
  switch (action.type) {
    case getType(userActions.userRegister): {
      return { ...state, loading: true };
    }

    case getType(authActions.userRegisterSuccess):
    case getType(authActions.userLoginSuccess): {
      const {
        user: { username },
      } = action.payload;
      return {
        ...state,
        username,
      };
    }

    default:
      return state;
  }
};

export type UserState = StateType<typeof userReducer>;
