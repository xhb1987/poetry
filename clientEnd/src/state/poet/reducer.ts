import { Poet, PoetDialogType } from './types';
import { PoetActions, poetActions } from './actions';
import { getType, StateType } from 'typesafe-actions';

type PoetReducer = {
  selectedPoet?: Poet;
  openDialog: boolean;
  poetDialogType?: PoetDialogType;
  openAddCollectionDialog: boolean;

  searchLoading: boolean;
  searchLoadingError: boolean;
  searchPoets: Poet[];
};

const initState: PoetReducer = {
  selectedPoet: undefined,
  openDialog: false,
  poetDialogType: undefined,
  openAddCollectionDialog: false,
  searchLoading: false,
  searchLoadingError: false,
  searchPoets: [],
};

export const poetReducer = (state: PoetReducer = initState, action: PoetActions) => {
  switch (action.type) {
    case getType(poetActions.selectPoet): {
      return { ...state, selectedPoet: action.payload.poet };
    }

    case getType(poetActions.openPoetDialog): {
      return {
        ...state,
        openDialog: true,
        poetDialogType: action.payload.dialogType,
      };
    }
    case getType(poetActions.closePoetDialog): {
      return {
        ...state,
        openDialog: false,
        poetDialogType: undefined,
      };
    }

    case getType(poetActions.searchPoet): {
      return {
        ...state,
        searchLoading: true,
        searchLoadingError: false,
      };
    }
    case getType(poetActions.searchPoetSuccess):
      return {
        ...state,
        searchPoets: action.payload.poets,
        searchLoading: false,
      };
    case getType(poetActions.searchPoetError): {
      return {
        ...state,
        searchLoading: false,
        searchLoadingError: true,
      };
    }

    case getType(poetActions.clearSearchResult): {
      return {
        ...state,
        searchPoets: [],
      };
    }

    default:
      return state;
  }
};

export type PoetState = StateType<typeof poetReducer>;
