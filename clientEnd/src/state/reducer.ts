// Imports: Dependencies
import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { UserActions } from './user/actions';
import { UserRootState } from './user/types';
import { poetReducer } from './poet/reducer';
import { PoetRootState } from './poet/types';
import { FavoritesRootState } from './favorites/types';
import { FinishedRootState } from './finished/types';
import { ReciteCollectionRootState } from './recites/types';
import { AuthState } from './auth/types';
import { favoritesReducer } from './favorites/reducer';
import { finishedReducer } from './finished/reducer';
import { reciteCollectionsReducer } from './recites/reducer';
import { authReducer } from './auth/reducer';

export type RootActions = UserActions;
export type RootState = {
  user: UserRootState;
  poet: PoetRootState;
  favorites: FavoritesRootState;
  finished: FinishedRootState;
  recites: ReciteCollectionRootState;
  auth: AuthState;
};

// Redux: Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  poet: poetReducer,
  favorites: favoritesReducer,
  finished: finishedReducer,
  recites: reciteCollectionsReducer,
  auth: authReducer,
});
// Exports
export default rootReducer;
