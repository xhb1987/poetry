import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectRecite = (state: RootState) => state.recites;
export const selectReciteCollections = createSelector(selectRecite, (recite) => recite.collections || []);
export const selectReciteCollectionPoets = createSelector(
  selectRecite,
  (recites) => recites.selectedReciteCollection?.poet || []
);

export const selectReciteCollectionLoading = createSelector(selectRecite, (recite) => recite.loading);
export const selectReciteCollectionError = createSelector(selectRecite, (recite) => recite.error);

export const selectAddCollectionDialog = createSelector(selectRecite, (recite) => recite.openAddCollectionDialog);
