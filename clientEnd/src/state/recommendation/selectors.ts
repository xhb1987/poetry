import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectRecommendation = (state: RootState) => state.recommendation;
export const selectRecommendationPoet = createSelector(selectRecommendation, (recommendation) => {
  return recommendation.recommendationPoets.filter((recommendationPoet) => !!recommendationPoet.poet);
});

export const selectRecommendationLoading = createSelector(
  selectRecommendation,
  (recommendation) => recommendation.loading
);
