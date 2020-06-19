import { IPoet } from '../poet/types';
import { UserActions } from './actions';
import { UserState } from './reducer';

export type Role = 'USER' | 'ADMIN';

export interface IProfile {
  name: string;
  favorites: IPoet[];
  recites: IPoet[];
  finished: IPoet[];
}
export interface IUser {
  username: string;
  roles: Role[];
  profile: IProfile;
}

export type UserRootAction = UserActions;
export type UserRootState = UserState;
