import { Epic, combineEpics } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootState } from '../reducer';
import { RecommendationRootAction } from './types';

import { AuthRootAction } from '../auth/types';
import { authActions } from '../auth/actions';
import { recommendationActions } from './actions';

export const recommendationEpic: Epic<
  AuthRootAction | RecommendationRootAction,
  AuthRootAction | RecommendationRootAction,
  RootState
> = (action$) =>
  action$.pipe(
    filter(isActionOf([authActions.userLoginSuccess, authActions.userLoginError])),
    map(() => recommendationActions.fetchRecommendation())
  );

export default combineEpics(recommendationEpic);
