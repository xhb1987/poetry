import { Epic, ofType, combineEpics } from 'redux-observable';
import { UserRootAction, UserRootState } from './types';
import { filter, switchMap, map, catchError, tap, ignoreElements } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { userActions } from './actions';

export const userEpic: Epic<UserRootAction, UserRootAction, UserRootState> = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(userActions.userRegister)),
    tap(() => console.log('epic')),
    ignoreElements()
  );

export default combineEpics(userEpic);
