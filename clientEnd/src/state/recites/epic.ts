import { Epic, combineEpics } from 'redux-observable';
import { ReciteCollectionRootAction } from './types';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootState } from '../reducer';
import { recitesActions, recitesRestActions } from './actions';
import { poetActions } from '../poet/actions';
import { PoetRootAction } from '../poet/types';
import { asapScheduler, scheduled } from 'rxjs';

export const reciteAddCollectionEpic: Epic<ReciteCollectionRootAction, ReciteCollectionRootAction, RootState> = (
  action$
) =>
  action$.pipe(
    filter(isActionOf(recitesRestActions.addCollectionSuccess)),
    map(recitesActions.closeAddCollectionDialog)
  );

export const reciteUpdatePoetEpic: Epic<
  ReciteCollectionRootAction | PoetRootAction,
  ReciteCollectionRootAction | PoetRootAction,
  RootState
> = (action$) =>
  action$.pipe(
    filter(
      isActionOf([recitesRestActions.addPoetToCollectionSuccess, recitesRestActions.deletePoetFromCollectionSuccess])
    ),
    map(poetActions.closePoetDialog)
  );

export const reciteFinishCollectionEpic: Epic<ReciteCollectionRootAction, ReciteCollectionRootAction> = (action$) =>
  action$.pipe(
    filter(isActionOf(recitesRestActions.finishCollectionSuccess)),
    mergeMap(() => scheduled([recitesActions.openFinishReciteDialog()], asapScheduler))
  );

export default combineEpics(reciteAddCollectionEpic, reciteUpdatePoetEpic, reciteFinishCollectionEpic);
