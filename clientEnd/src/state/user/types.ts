import { Poet } from '../poet/types';
import { UserActions } from './actions';
import { UserState } from './reducer';

export type Role = 'USER' | 'ADMIN';

export type User = {
  username: string;
  roles: Role[];
  profile?: {
    id: number;
    name: string;
  };
};

export type UserRootAction = UserActions;
export type UserRootState = UserState;
