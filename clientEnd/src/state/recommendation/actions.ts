import {
  FETCH_RECOMMENDATION,
  FETCH_RECOMMENDATION_ERROR,
  FETCH_RECOMMENDATION_SUCCESS,
} from 'src/common/rest/actions/recommendationActions';
import { ResponseMessage } from 'src/common/types/types';
import { createAction, ActionType } from 'typesafe-actions';
import { RecommendationPoet } from './types';

export const recommendationRestActions = {
  fetchRecommendationSuccess: createAction(
    FETCH_RECOMMENDATION_SUCCESS,
    (responseMessage: ResponseMessage<RecommendationPoet[]>) => ({
      recommendationPoets: responseMessage.data,
    })
  )<{
    recommendationPoets: RecommendationPoet[];
  }>(),
  fetchRecommendationError: createAction(FETCH_RECOMMENDATION_ERROR)(),
};

export const recommendationActions = {
  fetchRecommendation: createAction(FETCH_RECOMMENDATION, () => ({
    request: {
      url: 'http://localhost:3001/recommendation/all',
      method: 'GET',
      headers: {},
    },
    onSuccess: recommendationRestActions.fetchRecommendationSuccess,
    onError: recommendationRestActions.fetchRecommendationError,
  }))(),
  selectRecommendationPoet: createAction,
};

export type RecommendationActions = ActionType<typeof recommendationActions>;
export type RecommendationRestActions = ActionType<typeof recommendationRestActions>;
