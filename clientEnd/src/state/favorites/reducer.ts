import { FavoritesReducer } from './types';
import { Action, StateType } from 'typesafe-actions';

const initFavoritesState: FavoritesReducer = {
  favoritePoets: [],
  loading: false,
  error: false,
};

export const favoritesReducer = (state: FavoritesReducer = initFavoritesState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export type FavoritesState = StateType<typeof favoritesReducer>;
