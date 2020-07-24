import { createAction, ActionType } from 'typesafe-actions';
import { Collection } from './types';
import { ResponseMessage } from 'src/common/types/types';
import { AjaxError } from 'rxjs/ajax';
import {
  ADD_COLLECTION_SUCCESS,
  ADD_COLLECTION_ERROR,
  ADD_COLLECTION,
  ADD_POET_TO_COLLECTION,
  ADD_POET_TO_COLLECTION_SUCCESS,
  ADD_POET_TO_COLLECTION_ERROR,
  FINISH_COLLECTION_SUCCESS,
  FINISH_COLLECTION_ERROR,
  FINISH_COLLECTION,
} from 'src/common/rest/actions/reciteActions';
import { Poet } from '../poet/types';

export const SELECT_RECITE_COLLECTION = 'recite/SELECT_RECITE_COLLECTION';
export const OPEN_ADD_COLLECTION_DIALOG = 'recite/OPEN_ADD_COLLECTION_DIALOG';
export const CLOSE_ADD_COLLECTION_DIALOG = 'recite/CLOSE_ADD_COLLECTION_DIALOG';

export const OPEN_FINISH_RECITE_DIALOG = 'recite/OPEN_FINISH_RECITE_DIALOG';
export const CLOSE_FINISH_RECITE_DIALOG = 'recite/CLOSE_FINISH_RECITE_DIALOG';

export const recitesRestActions = {
  addCollectionSuccess: createAction(ADD_COLLECTION_SUCCESS, (responseMessage: ResponseMessage<Collection[]>) => ({
    collection: responseMessage.data,
  }))<{
    collection: Collection[];
  }>(),
  addCollectionError: createAction(ADD_COLLECTION_ERROR, (error: AjaxError) => ({ error }))<{
    error: AjaxError;
  }>(),

  addPoetToCollectionSuccess: createAction(
    ADD_POET_TO_COLLECTION_SUCCESS,
    (responseMessage: ResponseMessage<Collection>) => ({
      collection: responseMessage.data,
    })
  )<{
    collection: Collection;
  }>(),
  addPoetToCollectionError: createAction(ADD_POET_TO_COLLECTION_ERROR)(),

  finishCollectionSuccess: createAction(FINISH_COLLECTION_SUCCESS, (responseMessage: ResponseMessage<Collection>) => ({
    collection: responseMessage.data,
  }))<{ collection: Collection }>(),
  finishCollectionError: createAction(FINISH_COLLECTION_ERROR)(),
};

export const recitesActions = {
  selectReciteCollection: createAction(SELECT_RECITE_COLLECTION, (collection: Collection) => ({
    collection,
  }))<{ collection: Collection }>(),
  openAddCollectionDialog: createAction(OPEN_ADD_COLLECTION_DIALOG)(),
  closeAddCollectionDialog: createAction(CLOSE_ADD_COLLECTION_DIALOG)(),

  openFinishReciteDialog: createAction(OPEN_FINISH_RECITE_DIALOG)(),
  closeFinishReciteDialog: createAction(CLOSE_FINISH_RECITE_DIALOG)(),

  addCollection: createAction(ADD_COLLECTION, (collectionName: string) => ({
    request: {
      url: `http://localhost:3001/profile/collection/add`,
      method: 'POST',
      body: JSON.stringify({ name: collectionName, isFinished: false }),
    },
    onSuccess: recitesRestActions.addCollectionSuccess,
    onError: recitesRestActions.addCollectionError,
  }))(),
  addCollectionSuccess: recitesRestActions.addCollectionSuccess,
  addCollectionError: recitesRestActions.addCollectionError,

  addPoetToCollection: createAction(ADD_POET_TO_COLLECTION, (poet: Poet, collection: Collection) => ({
    request: {
      url: `http://localhost:3001/profile/collection/${collection.id}/addPoet/${poet.id}`,
      method: 'PATCH',
    },
    onSuccess: recitesRestActions.addPoetToCollectionSuccess,
    onError: recitesRestActions.addPoetToCollectionError,
  }))(),
  addPoetToCollectionSuccess: recitesRestActions.addPoetToCollectionSuccess,
  addPoetToCollectionError: recitesRestActions.addPoetToCollectionError,

  finishCollection: createAction(FINISH_COLLECTION, (collectionId: number) => ({
    request: {
      url: `http://localhost:3001/profile/collection/${collectionId}/finish`,
      method: 'PATCH',
    },
    onSuccess: recitesRestActions.finishCollectionSuccess,
    onError: recitesRestActions.finishCollectionError,
  }))(),
  finishCollectionSuccess: recitesRestActions.finishCollectionSuccess,
  finishCollectionError: recitesRestActions.finishCollectionError,
};

export type RecitesActions = ActionType<typeof recitesActions>;
