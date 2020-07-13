import { Epic, ofType, combineEpics } from 'redux-observable';
import { ReciteCollectionRootAction } from './types';
import { filter, switchMap, map, catchError, tap, ignoreElements } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootState } from '../reducer';
import { recitesActions } from './actions';

export const reciteEpic: Epic<ReciteCollectionRootAction, ReciteCollectionRootAction, RootState> = (action$, state$) =>
  action$.pipe(filter(isActionOf(recitesActions.addCollectionSuccess)), map(recitesActions.closeAddCollectionDialog));

export default combineEpics(reciteEpic);
