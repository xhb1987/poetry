import { Poet } from 'src/state/poet/types';
import { favoritesReducer } from './reducer';
import { StateType } from 'typesafe-actions';

export type FavoritesReducer = {
  favoritePoets: Poet[];
  loading: boolean;
  error: boolean;
};

export type FavoritesRootState = StateType<typeof favoritesReducer>;
