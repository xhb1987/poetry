import { AjaxError } from 'rxjs/ajax';
import { Poetry, PoetryDialogType } from './types';
import { createAction, ActionType } from 'typesafe-actions';
import { ResponseMessage } from 'src/common/types/types';
import { SEARCH_POETRY, SEARCH_POETRY_SUCCESS, SEARCH_POETRY_ERROR } from 'src/common/rest/actions/searchActions';

export const SELECT_POETRY = 'poetry/SELECT_POETRY';
export const OPEN_POETRY_DIALOG = 'poetry/OPEN_POETRY_DIALOG';
export const CLOSE_POETRY_DIALOG = 'poetry/CLOSE_POETRY_DIALOG';

export const CLEAR_SEARCH_RESULT = 'poetry/CLEAR_SEARCH_RESULT';

export const poetryResponseActions = {
  searchPoetrySuccess: createAction(SEARCH_POETRY_SUCCESS, (responseMessage: ResponseMessage<Poetry[]>) => ({
    poetries: responseMessage.data,
  }))<{
    poetries: Poetry[];
  }>(),
  searchPoetryError: createAction(SEARCH_POETRY_ERROR, (error: AjaxError) => ({ error }))<{
    error: AjaxError;
  }>(),
};

export const poetryActions = {
  selectPoetry: createAction(SELECT_POETRY, (poetry: Poetry) => ({ poetry }))<{ poetry: Poetry }>(),

  openPoetryDialog: createAction(OPEN_POETRY_DIALOG, (dialogType: PoetryDialogType) => ({ dialogType }))<{
    dialogType: PoetryDialogType;
  }>(),

  closePoetryDialog: createAction(CLOSE_POETRY_DIALOG)(),

  clearSearchResult: createAction(CLEAR_SEARCH_RESULT)(),

  searchPoetry: createAction(SEARCH_POETRY, (poetryTitleOrParagraphs: string) => ({
    request: { url: `http://localhost:3001/poet/detail/content/${poetryTitleOrParagraphs}` },
    onSuccess: poetryResponseActions.searchPoetrySuccess,
    onError: poetryResponseActions.searchPoetryError,
  }))(),
  searchPoetrySuccess: poetryResponseActions.searchPoetrySuccess,
  searchPoetryError: poetryResponseActions.searchPoetryError,
};

export type PoetryActions = ActionType<typeof poetryActions | typeof poetryResponseActions>;
