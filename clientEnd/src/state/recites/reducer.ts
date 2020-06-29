import { ReciteCollectionsReducer } from './types';
import { Action, getType } from 'typesafe-actions';
import { recitesActions, RecitesActions } from './actions';

const initReciteState: ReciteCollectionsReducer = {
  collections: undefined,
  loading: false,
  error: false,
  selectedReciteCollection: undefined,
  openAddCollectionDialog: false,
};

export const reciteCollectionsReducer = (state: ReciteCollectionsReducer = initReciteState, action: RecitesActions) => {
  switch (action.type) {
    case getType(recitesActions.openAddCollectionDialog): {
      return {
        ...state,
        openAddCollectionDialog: true,
      };
    }

    case getType(recitesActions.closeAddCollectionDialog): {
      return {
        ...state,
        openAddCollectionDialog: false,
      };
    }

    case getType(recitesActions.addCollection): {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case getType(recitesActions.addCollectionSuccess): {
      const newCollection = action.payload.collection;
      return {
        ...state,
        loading: false,
        collections: [...(state.collections ? state.collections : []), newCollection],
      };
    }

    case getType(recitesActions.addCollectionError): {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    default:
      return state;
  }
};
