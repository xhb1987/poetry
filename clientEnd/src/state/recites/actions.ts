import { createAction, ActionType } from 'typesafe-actions';
import { Collection } from './types';
import { ResponseMessage } from 'src/common/types/types';
import { AjaxError } from 'rxjs/ajax';
import {
  ADD_COLLECTION_SUCCESS,
  ADD_COLLECTION_ERROR,
  ADD_COLLECTION,
  ADD_POETRY_TO_COLLECTION,
  ADD_POETRY_TO_COLLECTION_SUCCESS,
  ADD_POETRY_TO_COLLECTION_ERROR,
  FINISH_COLLECTION_SUCCESS,
  FINISH_COLLECTION_ERROR,
  FINISH_COLLECTION,
  DELETE_COLLECTIONS,
  DELETE_COLLECTIONS_SUCCESS,
  DELETE_COLLECTIONS_ERROR,
  DELETE_POETRY_FROM_COLLECTION_SUCCESS,
  DELETE_POETRY_FROM_COLLECTION_ERROR,
  DELETE_POETRY_FROM_COLLECTION,
} from 'src/common/rest/actions/reciteActions';

export const SELECT_RECITE_COLLECTION = 'recite/SELECT_RECITE_COLLECTION';
export const OPEN_ADD_COLLECTION_DIALOG = 'recite/OPEN_ADD_COLLECTION_DIALOG';
export const CLOSE_ADD_COLLECTION_DIALOG = 'recite/CLOSE_ADD_COLLECTION_DIALOG';

export const OPEN_FINISH_RECITE_DIALOG = 'recite/OPEN_FINISH_RECITE_DIALOG';
export const CLOSE_FINISH_RECITE_DIALOG = 'recite/CLOSE_FINISH_RECITE_DIALOG';

export const EDIT_COLLECTION_START = 'recite/EDIT_COLLECTION_START';
export const EDIT_COLLECTION_END = 'recite/EDIT_COLLECTION_END';

export const recitesRestActions = {
  addCollectionSuccess: createAction(ADD_COLLECTION_SUCCESS, (responseMessage: ResponseMessage<Collection[]>) => ({
    collection: responseMessage.data,
  }))<{
    collection: Collection[];
  }>(),
  addCollectionError: createAction(ADD_COLLECTION_ERROR, (error: AjaxError) => ({ error }))<{
    error: AjaxError;
  }>(),

  addPoetryToCollectionSuccess: createAction(
    ADD_POETRY_TO_COLLECTION_SUCCESS,
    (responseMessage: ResponseMessage<Collection>) => ({
      collection: responseMessage.data,
    })
  )<{
    collection: Collection;
  }>(),
  addPoetryToCollectionError: createAction(ADD_POETRY_TO_COLLECTION_ERROR)(),

  deletePoetryFromCollectionSuccess: createAction(
    DELETE_POETRY_FROM_COLLECTION_SUCCESS,
    (responseMessage: ResponseMessage<Collection>) => ({
      collection: responseMessage.data,
    })
  )<{
    collection: Collection;
  }>(),
  deletePoetryFromCollectionError: createAction(DELETE_POETRY_FROM_COLLECTION_ERROR)(),

  finishCollectionSuccess: createAction(FINISH_COLLECTION_SUCCESS, (responseMessage: ResponseMessage<Collection>) => ({
    collection: responseMessage.data,
  }))<{ collection: Collection }>(),
  finishCollectionError: createAction(FINISH_COLLECTION_ERROR)(),

  deleteCollectionsSuccess: createAction(
    DELETE_COLLECTIONS_SUCCESS,
    (responseMessage: ResponseMessage<Collection[]>) => ({
      collections: responseMessage.data,
    })
  )<{ collections: Collection[] }>(),
  deleteCollectionsError: createAction(DELETE_COLLECTIONS_ERROR, (error: AjaxError) => ({ error }))<{
    error: AjaxError;
  }>(),
};

export const recitesActions = {
  selectReciteCollection: createAction(SELECT_RECITE_COLLECTION, (collection: Collection) => ({
    collection,
  }))<{ collection: Collection }>(),
  openAddCollectionDialog: createAction(OPEN_ADD_COLLECTION_DIALOG)(),
  closeAddCollectionDialog: createAction(CLOSE_ADD_COLLECTION_DIALOG)(),

  openFinishReciteDialog: createAction(OPEN_FINISH_RECITE_DIALOG)(),
  closeFinishReciteDialog: createAction(CLOSE_FINISH_RECITE_DIALOG)(),

  editCollectionStart: createAction(EDIT_COLLECTION_START)(),
  editCollectionEnd: createAction(EDIT_COLLECTION_END)(),

  addCollection: createAction(ADD_COLLECTION, (collectionName: string) => ({
    request: {
      url: `http://localhost:3001/profile/collection/add`,
      method: 'POST',
      body: JSON.stringify({ name: collectionName, isFinished: false }),
    },
    onSuccess: recitesRestActions.addCollectionSuccess,
    onError: recitesRestActions.addCollectionError,
  }))(),

  addPoetryToCollection: createAction(ADD_POETRY_TO_COLLECTION, (collectionId: number, poetryId: number) => ({
    request: {
      url: `http://localhost:3001/profile/collection/${collectionId}/addPoet/${poetryId}`,
      method: 'PATCH',
    },
    onSuccess: recitesRestActions.addPoetryToCollectionSuccess,
    onError: recitesRestActions.addPoetryToCollectionError,
  }))(),

  deletePoetFromCollection: createAction(DELETE_POETRY_FROM_COLLECTION, (collectionId: number, poetryId: number) => ({
    request: {
      url: `http://localhost:3001/profile/collection/${collectionId}/deletePoet/${poetryId}`,
      method: 'DELETE',
    },
    onSuccess: recitesRestActions.deletePoetryFromCollectionSuccess,
    onError: recitesRestActions.deletePoetryFromCollectionError,
  }))(),

  finishCollection: createAction(FINISH_COLLECTION, (collectionId: number) => ({
    request: {
      url: `http://localhost:3001/profile/collection/${collectionId}/finish`,
      method: 'PATCH',
    },
    onSuccess: recitesRestActions.finishCollectionSuccess,
    onError: recitesRestActions.finishCollectionError,
  }))(),

  deleteCollections: createAction(DELETE_COLLECTIONS, (collectionIds: number[]) => ({
    request: {
      url: 'http://localhost:3001/profile/collection/delete',
      method: 'DELETE',
      body: JSON.stringify({ collectionIds }),
    },
    onSuccess: recitesRestActions.deleteCollectionsSuccess,
    onError: recitesRestActions.deleteCollectionsError,
  }))(),
};

export type RecitesActions = ActionType<typeof recitesActions>;
export type RecitesRestActions = ActionType<typeof recitesRestActions>;
