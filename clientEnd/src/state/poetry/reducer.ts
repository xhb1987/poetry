import { Poetry, PoetryDialogType } from './types';
import { PoetryActions, poetryActions } from './actions';
import { getType, StateType } from 'typesafe-actions';

type PoetryReducer = {
  selectedPoetry?: Poetry;
  openDialog: boolean;
  poetryDialogType?: PoetryDialogType;
  openAddCollectionDialog: boolean;

  searchLoading: boolean;
  searchLoadingError: boolean;
  searchPoetries: Poetry[];
};

const initState: PoetryReducer = {
  selectedPoetry: undefined,
  openDialog: false,
  poetryDialogType: undefined,
  openAddCollectionDialog: false,
  searchLoading: false,
  searchLoadingError: false,
  searchPoetries: [],
};

export const poetryReducer = (state: PoetryReducer = initState, action: PoetryActions) => {
  switch (action.type) {
    case getType(poetryActions.selectPoetry): {
      return { ...state, selectedPoetry: action.payload.poetry };
    }

    case getType(poetryActions.openPoetryDialog): {
      return {
        ...state,
        openDialog: true,
        poetryDialogType: action.payload.dialogType,
      };
    }
    case getType(poetryActions.closePoetryDialog): {
      return {
        ...state,
        openDialog: false,
        poetryDialogType: undefined,
      };
    }

    case getType(poetryActions.searchPoetry): {
      return {
        ...state,
        searchLoading: true,
        searchLoadingError: false,
      };
    }
    case getType(poetryActions.searchPoetrySuccess):
      return {
        ...state,
        searchPoetries: action.payload.poetries,
        searchLoading: false,
      };
    case getType(poetryActions.searchPoetryError): {
      return {
        ...state,
        searchLoading: false,
        searchLoadingError: true,
      };
    }

    case getType(poetryActions.clearSearchResult): {
      return {
        ...state,
        searchPoetries: [],
      };
    }

    default:
      return state;
  }
};

export type PoetryState = StateType<typeof poetryReducer>;
