import { Epic, combineEpics } from 'redux-observable';
import { ReciteCollectionRootAction } from './types';
import { filter, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootState } from '../reducer';
import { recitesActions } from './actions';
import { poetActions } from '../poet/actions';
import { PoetRootAction } from '../poet/types';
import { asapScheduler, scheduled } from 'rxjs';
import { routes } from 'src/screen/routes';

export const reciteAddCollectionEpic: Epic<ReciteCollectionRootAction, ReciteCollectionRootAction, RootState> = (
  action$
) =>
  action$.pipe(filter(isActionOf(recitesActions.addCollectionSuccess)), map(recitesActions.closeAddCollectionDialog));

export const reciteAddPoetEpic: Epic<
  ReciteCollectionRootAction | PoetRootAction,
  ReciteCollectionRootAction | PoetRootAction,
  RootState
> = (action$) =>
  action$.pipe(filter(isActionOf(recitesActions.addPoetToCollectionSuccess)), map(poetActions.closePoetDialog));

export const reciteFinishCollectionEpic: Epic<ReciteCollectionRootAction, ReciteCollectionRootAction> = (action$) =>
  action$.pipe(
    filter(isActionOf(recitesActions.finishCollectionSuccess)),
    mergeMap(() => scheduled([recitesActions.openFinishReciteDialog()], asapScheduler))
  );

export default combineEpics(reciteAddCollectionEpic, reciteAddPoetEpic, reciteFinishCollectionEpic);
