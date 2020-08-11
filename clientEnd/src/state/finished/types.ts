import { Poetry } from 'src/state/poetry/types';
import { StateType } from 'typesafe-actions';
import { finishedReducer } from './reducer';

export type FinishedReducer = {
  finishedPoetries: Poetry[];
  loading: boolean;
  error: boolean;
};

export type FinishedRootState = StateType<typeof finishedReducer>;
