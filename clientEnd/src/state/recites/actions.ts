import { createAction, ActionType } from 'typesafe-actions';
import { Collection } from './types';
import { ResponseMessage } from 'src/common/types/types';
import { AjaxError } from 'rxjs/ajax';
import { ADD_COLLECTION_SUCCESS, ADD_COLLECTION_ERROR, ADD_COLLECTION } from 'src/common/rest/actions/reciteActions';

export const SELECT_RECITE_COLLECTION = 'recite/SELECT_RECITE_COLLECTION';
export const OPEN_ADD_COLLECTION_DIALOG = 'recite/OPEN_ADD_COLLECTION_DIALOG';
export const CLOSE_ADD_COLLECTION_DIALOG = 'recite/CLOSE_ADD_COLLECTION_DIALOG';

export const recitesRestActions = {
  addCollectionSuccess: createAction(ADD_COLLECTION_SUCCESS, (responseMessage: ResponseMessage<Collection[]>) => ({
    collection: responseMessage.data,
  }))<{
    collection: Collection[];
  }>(),
  addCollectionError: createAction(ADD_COLLECTION_ERROR, (error: AjaxError) => ({ error }))<{
    error: AjaxError;
  }>(),
};

export const recitesActions = {
  selectReciteCollection: createAction(SELECT_RECITE_COLLECTION, (collection: Collection) => ({
    collection,
  }))<{ collection: Collection }>(),
  openAddCollectionDialog: createAction(OPEN_ADD_COLLECTION_DIALOG)(),
  closeAddCollectionDialog: createAction(CLOSE_ADD_COLLECTION_DIALOG)(),

  addCollection: createAction(ADD_COLLECTION, (collectionName: string) => ({
    request: {
      url: `http://localhost:3001/profile/collection/add`,
      method: 'POST',
      body: JSON.stringify({ name: collectionName }),
    },
    onSuccess: recitesRestActions.addCollectionSuccess,
    onError: recitesRestActions.addCollectionError,
  }))(),
  addCollectionSuccess: recitesRestActions.addCollectionSuccess,
  addCollectionError: recitesRestActions.addCollectionError,
};

export type RecitesActions = ActionType<typeof recitesActions>;
