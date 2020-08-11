import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectPoetry = (state: RootState) => state.poetry;
export const selectSelectedPoetry = createSelector(selectPoetry, (poetry) => poetry.selectedPoetry);
export const selectPoetryDialog = createSelector(selectPoetry, (poetry) => poetry.openDialog);
export const selectPoetryDialogType = createSelector(selectPoetry, (poetry) => poetry.poetryDialogType);

export const selectPoetrySearchLoading = createSelector(selectPoetry, (poetry) => poetry.searchLoading);
export const selectPoetrySearch = createSelector(selectPoetry, (poetry) => poetry.searchPoetries);
