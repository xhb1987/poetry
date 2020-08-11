import { Epic, combineEpics } from 'redux-observable';
import { ReciteCollectionRootAction } from './types';
import { filter, map, mergeMap, pluck } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootState } from '../reducer';
import { recitesActions, recitesRestActions } from './actions';
import { poetryActions } from '../poetry/actions';
import { PoetryRootAction } from '../poetry/types';
import { asapScheduler, scheduled } from 'rxjs';
import { notificationActions } from '../notification/actions';
import { NotificationRootActions } from '../notification/types';

export const reciteAddCollectionEpic: Epic<ReciteCollectionRootAction, ReciteCollectionRootAction, RootState> = (
  action$
) =>
  action$.pipe(
    filter(isActionOf(recitesRestActions.addCollectionSuccess)),
    map(recitesActions.closeAddCollectionDialog)
  );

export const reciteDeleteCollections: Epic<
  ReciteCollectionRootAction | NotificationRootActions,
  ReciteCollectionRootAction | NotificationRootActions
> = (action$) =>
  action$.pipe(
    filter(isActionOf(recitesRestActions.deleteCollectionsSuccess)),
    map(() => notificationActions.setNotification('info', '诗单删除成功'))
  );

export const reciteUpdatePoetryEpic: Epic<
  ReciteCollectionRootAction | PoetryRootAction | NotificationRootActions,
  ReciteCollectionRootAction | PoetryRootAction | NotificationRootActions,
  RootState
> = (action$) =>
  action$.pipe(
    filter(
      isActionOf([
        recitesRestActions.addPoetryToCollectionSuccess,
        recitesRestActions.deletePoetryFromCollectionSuccess,
      ])
    ),
    pluck('payload'),
    mergeMap(({ collection }) =>
      scheduled(
        [
          poetryActions.closePoetryDialog(),
          notificationActions.setNotification('info', `${collection.name} 更新成功啦`),
        ],
        asapScheduler
      )
    )
  );

export const reciteFinishCollectionEpic: Epic<ReciteCollectionRootAction, ReciteCollectionRootAction> = (action$) =>
  action$.pipe(
    filter(isActionOf(recitesRestActions.finishCollectionSuccess)),
    mergeMap(() => scheduled([recitesActions.openFinishReciteDialog()], asapScheduler))
  );

export const reciteRestErrorEpic: Epic<
  ReciteCollectionRootAction | PoetryRootAction | NotificationRootActions,
  ReciteCollectionRootAction | PoetryRootAction | NotificationRootActions
> = (action$) =>
  action$.pipe(
    filter(
      isActionOf([
        recitesRestActions.addCollectionError,
        recitesRestActions.addPoetryToCollectionError,
        recitesRestActions.deleteCollectionsError,
        recitesRestActions.deletePoetryFromCollectionError,
        recitesRestActions.finishCollectionError,
      ])
    ),
    map(() => notificationActions.setNotification('error', '出错啦，请重新再试一下'))
  );

export default combineEpics(
  reciteAddCollectionEpic,
  reciteUpdatePoetryEpic,
  reciteFinishCollectionEpic,
  reciteDeleteCollections,
  reciteRestErrorEpic
);
