import { Poet } from 'src/state/poet/types';
import { StateType } from 'typesafe-actions';
import { finishedReducer } from './reducer';

export type FinishedReducer = {
  finishedPoets: Poet[];
  loading: boolean;
  error: boolean;
};

export type FinishedRootState = StateType<typeof finishedReducer>;
