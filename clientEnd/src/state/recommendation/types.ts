import { Poetry } from 'src/state/poetry/types';
import { StateType } from 'typesafe-actions';
import { RecommendationActions, RecommendationRestActions } from './actions';
import { recommendationReducer } from './reducer';

export type RecommendationPoetries = {
  id: number;
  name: string;
  poetry: Poetry;
};

export type RecommendationReducer = {
  recommendationPoetries: RecommendationPoetries[];
  loading: boolean;
  error: boolean;
};
export type RecommendationRootAction = RecommendationActions | RecommendationRestActions;

export type RecommendationRootState = StateType<typeof recommendationReducer>;
