import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectRecite = (state: RootState) => state.recites;
export const selectReciteCollections = createSelector(selectRecite, (recite) => recite.collections || []);

export const selectCurrentCollection = createSelector(selectRecite, (recite) => recite.selectedReciteCollection);
export const selectReciteCollectionPoets = createSelector(
  selectCurrentCollection,
  (collection) => collection?.poets || []
);

export const selectReciteCollectionLoading = createSelector(selectRecite, (recite) => recite.loading);
export const selectReciteCollectionError = createSelector(selectRecite, (recite) => recite.error);

export const selectOpenAddCollectionDialog = createSelector(selectRecite, (recite) => recite.openAddCollectionDialog);
export const selectOpenFinishReciteDialog = createSelector(selectRecite, (recite) => recite.openFinishReciteDialog);

export const selectUnfinishedCollections = createSelector(selectReciteCollections, (collections) =>
  collections.filter((collection) => !collection.isFinished)
);

export const selectFinishedCollections = createSelector(selectReciteCollections, (collections) =>
  collections.filter((collection) => collection.isFinished)
);
