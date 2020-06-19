// Imports: Dependencies
import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { UserActions } from './user/actions';
import { UserRootState } from './user/types';

export type RootActions = UserActions;
export type RootState = UserRootState;

// Redux: Root Reducer
const rootReducer = combineReducers({ user: userReducer });
// Exports
export default rootReducer;
