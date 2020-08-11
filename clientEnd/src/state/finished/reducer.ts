import { FinishedReducer } from './types';
import { Action, StateType } from 'typesafe-actions';

const initFinishedState: FinishedReducer = {
  finishedPoetries: [],
  loading: false,
  error: false,
};

export const finishedReducer = (state: FinishedReducer = initFinishedState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export type FinishedState = StateType<typeof finishedReducer>;
