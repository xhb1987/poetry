import { Action } from 'typesafe-actions';
import { AjaxRequest, AjaxResponse, AjaxError } from 'rxjs/ajax';
import { SEARCH_POET } from './searchActions';
import { ADD_COLLECTION } from './reciteActions';

export interface RestAction extends Action {
  payload: {
    request: AjaxRequest;
    onSuccess(response: any, ajaxResponse: AjaxResponse): Action;
    onError(error: AjaxError): Action;
  };
}

export const restActions = [SEARCH_POET, ADD_COLLECTION];
