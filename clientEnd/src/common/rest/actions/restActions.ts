import { Action } from 'typesafe-actions';
import { AjaxRequest, AjaxResponse, AjaxError } from 'rxjs/ajax';
import { SEARCH_POET } from './searchActions';
import {
  ADD_COLLECTION,
  ADD_POET_TO_COLLECTION,
  DELETE_COLLECTIONS,
  DELETE_POET_FROM_COLLECTION,
  FINISH_COLLECTION,
} from './reciteActions';
import { USER_LOGIN, USER_LOGIN_BY_TOKEN, USER_LOG_OUT } from './authActions';
import { USER_REGISTER } from 'src/state/user/actions';

export interface RestAction extends Action {
  payload: {
    request: AjaxRequest;
    onSuccess(response: any, ajaxResponse: AjaxResponse): Action;
    onError(error: AjaxError): Action;
  };
}

export const restActions = [
  SEARCH_POET,
  ADD_COLLECTION,
  USER_LOGIN,
  USER_LOGIN_BY_TOKEN,
  USER_REGISTER,
  USER_LOG_OUT,
  ADD_POET_TO_COLLECTION,
  FINISH_COLLECTION,
  DELETE_COLLECTIONS,
  DELETE_POET_FROM_COLLECTION,
];
