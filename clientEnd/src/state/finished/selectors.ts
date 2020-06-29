import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectFinished = (state: RootState) => state.finished;
export const selectFinishedPoets = createSelector(selectFinished, (finished) => finished.finishedPoets);
