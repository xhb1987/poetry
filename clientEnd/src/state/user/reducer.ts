import { User } from './types';
import { UserActions, userActions } from './actions';
import { getType, StateType } from 'typesafe-actions';

type UserReducer = User & {
  loading: boolean;
  error: boolean;
};

const initUserState: UserReducer = {
  username: '',
  roles: [],
  loading: false,
  error: false,
};

export const userReducer = (state: UserReducer = initUserState, action: UserActions) => {
  switch (action.type) {
    case getType(userActions.userRegister): {
      return { ...state, loading: true };
    }
    // case getType(userActions.selectUserProfileReciteCollection): {
    //   return {
    //     ...state,
    //     selectedReciteCollection: action.payload.collection,
    //   };
    // }
    default:
      return state;
  }
};

export type UserState = StateType<typeof userReducer>;
