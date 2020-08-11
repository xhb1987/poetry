import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectRecite = (state: RootState) => state.recites;
export const selectReciteCollections = (state: RootState) => state.recites.collections || [];

export const selectCurrentCollection = createSelector(selectRecite, (recite) => recite.selectedReciteCollection);
export const selectReciteCollectionPoetries = createSelector(
  selectCurrentCollection,
  (collection) => collection?.poetries || []
);

export const selectReciteCollectionLoading = createSelector(selectRecite, (recite) => recite.loading);
export const selectReciteCollectionError = createSelector(selectRecite, (recite) => recite.error);

export const selectOpenAddCollectionDialog = createSelector(selectRecite, (recite) => recite.openAddCollectionDialog);
export const selectOpenFinishReciteDialog = createSelector(selectRecite, (recite) => recite.openFinishReciteDialog);

export const selectUnfinishedCollections = (state: RootState) =>
  selectReciteCollections(state).filter((collection) => !collection.isFinished);

export const selectFinishedCollections = createSelector(selectReciteCollections, (collections) =>
  collections.filter((collection) => collection.isFinished)
);

export const selectCollectionEdit = createSelector(selectRecite, (recite) => recite.isCollectionEdit);
