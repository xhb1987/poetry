import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectFavorite = (state: RootState) => state.favorites;
export const selectFavoritePoets = createSelector(selectFavorite, (favorites) => favorites.favoritePoets);
