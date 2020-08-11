// Imports: Dependencies
import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { UserActions } from './user/actions';
import { UserRootState } from './user/types';
import { poetryReducer } from './poetry/reducer';
import { PoetryRootAction, PoetryRootState } from './poetry/types';
import { FinishedRootState } from './finished/types';
import { ReciteCollectionRootAction, ReciteCollectionRootState } from './recites/types';
import { AuthRootAction, AuthState } from './auth/types';
import { finishedReducer } from './finished/reducer';
import { reciteCollectionsReducer } from './recites/reducer';
import { authReducer } from './auth/reducer';
import { RecommendationRootState } from './recommendation/types';
import { recommendationReducer } from './recommendation/reducer';
import { NotificationRootActions, NotificationRootState } from './notification/types';
import { notificationReducer } from './notification/reducer';

export type RootActions =
  | UserActions
  | AuthRootAction
  | NotificationRootActions
  | PoetryRootAction
  | ReciteCollectionRootAction;

export type RootState = {
  user: UserRootState;
  poetry: PoetryRootState;
  finished: FinishedRootState;
  recites: ReciteCollectionRootState;
  auth: AuthState;
  recommendation: RecommendationRootState;
  notification: NotificationRootState;
};

// Redux: Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  poetry: poetryReducer,
  finished: finishedReducer,
  recites: reciteCollectionsReducer,
  auth: authReducer,
  recommendation: recommendationReducer,
  notification: notificationReducer,
});

// Exports
export default rootReducer;
