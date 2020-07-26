import { ReciteCollectionsReducer } from './types';
import { getType } from 'typesafe-actions';
import { recitesActions, RecitesActions, recitesRestActions, RecitesRestActions } from './actions';
import { AuthActions } from '../auth/types';
import { authActions } from '../auth/actions';
import { uniqBy } from 'lodash';

const initReciteState: ReciteCollectionsReducer = {
  collections: [],
  loading: false,
  error: false,
  selectedReciteCollection: undefined,
  openAddCollectionDialog: false,
  openFinishReciteDialog: false,
  isCollectionEdit: false,
};

export const reciteCollectionsReducer = (
  state: ReciteCollectionsReducer = initReciteState,
  action: RecitesActions | RecitesRestActions | AuthActions
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

    case getType(recitesActions.openFinishReciteDialog): {
      return {
        ...state,
        openFinishReciteDialog: true,
      };
    }

    case getType(recitesActions.closeFinishReciteDialog): {
      return {
        ...state,
        openFinishReciteDialog: false,
      };
    }

    case getType(recitesActions.deleteCollections):
    case getType(recitesActions.finishCollection):
    case getType(recitesActions.addPoetToCollection):
    case getType(recitesActions.addCollection): {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case getType(recitesRestActions.finishCollectionSuccess): {
      const { collection } = action.payload;
      const { collections } = state;

      // const indexCollection = collections?.find((coll) => coll.id === collection.id);
      const newCollections = collections.map((coll) => {
        if (coll.id === collection.id) {
          return {
            ...coll,
            isFinished: true,
          };
        }
        return coll;
      });
      return {
        ...state,
        loading: false,
        error: false,
        collections: newCollections,
      };
    }

    case getType(recitesRestActions.deletePoetFromCollectionSuccess):
    case getType(recitesRestActions.addPoetToCollectionSuccess): {
      const { collection } = action.payload;
      const { collections } = state;

      const updatedIndex = collections.findIndex((coll) => coll.id === collection.id);
      collections[updatedIndex] = collection;

      return { ...state, loading: false, collections, selectedReciteCollection: collection };
    }

    case getType(recitesRestActions.finishCollectionError): {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case getType(recitesRestActions.addCollectionSuccess): {
      return {
        ...state,
        loading: false,
        collections: [...action.payload.collection],
      };
    }

    case getType(recitesRestActions.deleteCollectionsSuccess): {
      return {
        ...state,
        loading: false,
        collections: action.payload.collections,
      };
    }
    case getType(recitesRestActions.deletePoetFromCollectionError):
    case getType(recitesRestActions.deleteCollectionsError):
    case getType(recitesRestActions.addPoetToCollectionError):
    case getType(recitesRestActions.addCollectionError): {
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

    case getType(recitesActions.editCollectionStart): {
      return {
        ...state,
        isCollectionEdit: true,
      };
    }

    case getType(recitesActions.editCollectionEnd): {
      return {
        ...state,
        isCollectionEdit: false,
      };
    }

    default:
      return state;
  }
};
