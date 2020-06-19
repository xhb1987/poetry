import { IUser } from './types';
import { UserActions, userActions } from './actions';
import { getType, StateType } from 'typesafe-actions';

type UserReducer = IUser & {
  loading: boolean;
  error: boolean;
};

const initState: UserReducer = {
  username: '',
  roles: [],
  profile: {
    name: '',
    favorites: [],
    recites: [],
    finished: [],
  },
  loading: false,
  error: false,
};

export const userReducer = (state: UserReducer = initState, action: UserActions) => {
  switch (action.type) {
    case getType(userActions.userRegister): {
      console.log('register in reducer');
      return { ...state, loading: true };
    }
    default:
      return state;
  }
};

export type UserState = StateType<typeof userReducer>;
