import { UserActions } from './actions';
import { UserState } from './reducer';
import { Collection } from '../recites/types';

export type Role = 'USER' | 'ADMIN';

export type User = {
  username: string;
  roles: Role[];
  collections?: Collection[];
};

export type UserRootAction = UserActions;
export type UserRootState = UserState;
