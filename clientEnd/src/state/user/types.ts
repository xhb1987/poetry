import { Poet } from '../poet/types';
import { UserActions } from './actions';
import { UserState } from './reducer';

export type Role = 'USER' | 'ADMIN';

export type ProfileReciteCollection = {
  id: number;
  name: string;
  poet: Poet[];
};

export type Profile = {
  id: number;
  name: string;
  favorites: Poet[];
  recites: ProfileReciteCollection[];
  finished: Poet[];
};
export type User = {
  username: string;
  roles: Role[];
  profile: Profile;
};

export type UserRootAction = UserActions;
export type UserRootState = UserState;
