import { RecommendationReducer, RecommendationRootAction } from './types';

import { getType, StateType } from 'typesafe-actions';
import { recommendationActions, recommendationRestActions } from './actions';

const initUserState: RecommendationReducer = {
  loading: false,
  error: false,
  recommendationPoetries: [],
};

export const recommendationReducer = (
  state: RecommendationReducer = initUserState,
  action: RecommendationRootAction
) => {
  switch (action.type) {
    case getType(recommendationActions.fetchRecommendation): {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case getType(recommendationRestActions.fetchRecommendationSuccess): {
      return {
        ...state,
        loading: false,
        error: false,
        recommendationPoetries: action.payload.recommendationPoetries,
      };
    }

    case getType(recommendationRestActions.fetchRecommendationError): {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
};

export type RecommendationState = StateType<typeof recommendationReducer>;
