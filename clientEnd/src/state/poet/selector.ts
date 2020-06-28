import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectPoet = (state: RootState) => state.poet;
export const selectSelectedPoet = createSelector(selectPoet, (poet) => poet.selectedPoet);
export const selectPoetDialog = createSelector(selectPoet, (poet) => poet.openDialog);
export const selectPoetSearchLoading = createSelector(selectPoet, (poet) => poet.searchLoading);
export const selectPoetSearch = createSelector(selectPoet, (poet) => poet.searchPoets);
export const selectWherePoetFrom = createSelector(selectPoet, (poet) => poet.from);
