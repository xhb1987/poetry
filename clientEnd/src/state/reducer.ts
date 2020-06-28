// Imports: Dependencies
import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { UserActions } from './user/actions';
import { UserRootState } from './user/types';
import { poetReducer } from './poet/reducer';
import { PoetRootState } from './poet/types';

export type RootActions = UserActions;
export type RootState = {
  user: UserRootState;
  poet: PoetRootState;
};

// Redux: Root Reducer
const rootReducer = combineReducers({ user: userReducer, poet: poetReducer });
// Exports
export default rootReducer;
