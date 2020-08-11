import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectRecommendation = (state: RootState) => state.recommendation;
export const selectRecommendationPoetry = createSelector(selectRecommendation, (recommendation) => {
  return recommendation.recommendationPoetries.filter((recommendationPoetry) => !!recommendationPoetry.poetry);
});

export const selectRecommendationLoading = createSelector(
  selectRecommendation,
  (recommendation) => recommendation.loading
);
