import { AjaxError } from 'rxjs/ajax';
import { Poet, PoetFrom } from './types';
import { createAction, ActionType } from 'typesafe-actions';
import { ResponseMessage } from 'src/common/types/types';
import { SEARCH_POET, SEARCH_POET_SUCCESS, SEARCH_POET_ERROR } from 'src/common/rest/actions/searchActions';

export const SELECT_POET = 'poet/SELECT_POET';
export const OPEN_POET_DIALOG = 'poet/OPEN_POET_DIALOG';
export const CLOSE_POET_DIALOG = 'poet/CLOSE_POET_DIALOG';

export const SET_WHERE_POET_FROM = 'poet/SET_WHERE_POET_FROM';

export const CLEAR_SEARCH_RESULT = 'poet/CLEAR_SEARCH_RESULT';

export const poetResponseActions = {
  searchPoetSuccess: createAction(SEARCH_POET_SUCCESS, (responseMessage: ResponseMessage<Poet[]>) => ({
    poets: responseMessage.data,
  }))<{
    poets: Poet[];
  }>(),
  searchPoetError: createAction(SEARCH_POET_ERROR, (error: AjaxError) => ({ error }))<{
    error: AjaxError;
  }>(),
};

export const poetActions = {
  selectPoet: createAction(SELECT_POET, (poet: Poet) => ({ poet }))<{ poet: Poet }>(),
  setWherePoetFrom: createAction(SET_WHERE_POET_FROM, (from: PoetFrom) => ({ from }))<{ from: PoetFrom }>(),

  openPoetDialog: createAction(OPEN_POET_DIALOG)(),
  closePoetDialog: createAction(CLOSE_POET_DIALOG)(),

  clearSearchResult: createAction(CLEAR_SEARCH_RESULT)(),

  searchPoet: createAction(SEARCH_POET, (poetTitleOrParagraphs: string) => ({
    request: { url: `http://localhost:3001/poet/detail/content/${poetTitleOrParagraphs}` },
    onSuccess: poetResponseActions.searchPoetSuccess,
    onError: poetResponseActions.searchPoetError,
  }))(),
  searchPoetSuccess: poetResponseActions.searchPoetSuccess,
  searchPoetError: poetResponseActions.searchPoetError,
};

export type PoetActions = ActionType<typeof poetActions | typeof poetResponseActions>;
