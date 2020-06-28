import { Poet, PoetFrom } from './types';
import { PoetActions, poetActions } from './actions';
import { getType, StateType } from 'typesafe-actions';

type PoetReducer = {
  selectedPoet?: Poet;
  from?: PoetFrom;
  openDialog: boolean;
  searchLoading: boolean;
  searchLoadingError: boolean;
  searchPoets: Poet[];
};

const initState: PoetReducer = {
  selectedPoet: undefined,
  openDialog: false,
  searchLoading: false,
  searchLoadingError: false,
  searchPoets: [],
  from: undefined,
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
      };
    }
    case getType(poetActions.closePoetDialog): {
      return {
        ...state,
        openDialog: false,
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

    case getType(poetActions.setWherePoetFrom): {
      return {
        ...state,
        from: action.payload.from,
      };
    }

    default:
      return state;
  }
};

export type PoetState = StateType<typeof poetReducer>;
