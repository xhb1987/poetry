import { Epic, combineEpics } from 'redux-observable';
import { ReciteCollectionRootAction } from './types';
import { filter, map, mergeMap, pluck } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootState } from '../reducer';
import { recitesActions, recitesRestActions } from './actions';
import { poetActions } from '../poet/actions';
import { PoetRootAction } from '../poet/types';
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

export const reciteUpdatePoetEpic: Epic<
  ReciteCollectionRootAction | PoetRootAction | NotificationRootActions,
  ReciteCollectionRootAction | PoetRootAction | NotificationRootActions,
  RootState
> = (action$) =>
  action$.pipe(
    filter(
      isActionOf([recitesRestActions.addPoetToCollectionSuccess, recitesRestActions.deletePoetFromCollectionSuccess])
    ),
    pluck('payload'),
    mergeMap(({ collection }) =>
      scheduled(
        [poetActions.closePoetDialog(), notificationActions.setNotification('info', `${collection.name} 更新成功啦`)],
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
  ReciteCollectionRootAction | PoetRootAction | NotificationRootActions,
  ReciteCollectionRootAction | PoetRootAction | NotificationRootActions
> = (action$) =>
  action$.pipe(
    filter(
      isActionOf([
        recitesRestActions.addCollectionError,
        recitesRestActions.addPoetToCollectionError,
        recitesRestActions.deleteCollectionsError,
        recitesRestActions.deletePoetFromCollectionError,
        recitesRestActions.finishCollectionError,
      ])
    ),
    map(() => notificationActions.setNotification('error', '出错啦，请重新再试一下'))
  );

export default combineEpics(
  reciteAddCollectionEpic,
  reciteUpdatePoetEpic,
  reciteFinishCollectionEpic,
  reciteDeleteCollections,
  reciteRestErrorEpic
);
