import { ReciteCollectionsReducer } from './types';
import { Action, getType } from 'typesafe-actions';
import { recitesActions, RecitesActions } from './actions';
import { AuthActions } from '../auth/types';
import { authActions } from '../auth/actions';

const initReciteState: ReciteCollectionsReducer = {
  collections: undefined,
  loading: false,
  error: false,
  selectedReciteCollection: undefined,
  openAddCollectionDialog: false,
};

export const reciteCollectionsReducer = (
  state: ReciteCollectionsReducer = initReciteState,
  action: RecitesActions | AuthActions
) => {
  switch (action.type) {
    case getType(authActions.userRegisterSuccess):
    case getType(authActions.userLoginSuccess): {
      const {
        user: { collections },
      } = action.payload;

      return {
        ...state,
        collections,
      };
    }

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
      return {
        ...state,
        loading: false,
        collections: [...action.payload.collection],
      };
    }

    case getType(recitesActions.addCollectionError): {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case getType(recitesActions.selectReciteCollection): {
      return {
        ...state,
        selectedReciteCollection: action.payload.collection,
      };
    }
    default:
      return state;
  }
};
