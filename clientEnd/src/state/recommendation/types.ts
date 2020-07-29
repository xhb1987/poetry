import { Poet } from 'src/state/poet/types';
import { StateType } from 'typesafe-actions';
import { RecommendationActions, RecommendationRestActions } from './actions';
import { recommendationReducer } from './reducer';

export type RecommendationPoet = {
  id: number;
  name: string;
  poet: Poet;
};

export type RecommendationReducer = {
  recommendationPoets: RecommendationPoet[];
  loading: boolean;
  error: boolean;
};
export type RecommendationRootAction = RecommendationActions | RecommendationRestActions;

export type RecommendationRootState = StateType<typeof recommendationReducer>;
