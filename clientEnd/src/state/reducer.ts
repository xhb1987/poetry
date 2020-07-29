// Imports: Dependencies
import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { UserActions } from './user/actions';
import { UserRootState } from './user/types';
import { poetReducer } from './poet/reducer';
import { PoetRootState } from './poet/types';
import { FinishedRootState } from './finished/types';
import { ReciteCollectionRootState } from './recites/types';
import { AuthState } from './auth/types';
import { finishedReducer } from './finished/reducer';
import { reciteCollectionsReducer } from './recites/reducer';
import { authReducer } from './auth/reducer';
import { RecommendationRootState } from './recommendation/types';
import { recommendationReducer } from './recommendation/reducer';

export type RootActions = UserActions;
export type RootState = {
  user: UserRootState;
  poet: PoetRootState;
  finished: FinishedRootState;
  recites: ReciteCollectionRootState;
  auth: AuthState;
  recommendation: RecommendationRootState;
};

// Redux: Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  poet: poetReducer,
  finished: finishedReducer,
  recites: reciteCollectionsReducer,
  auth: authReducer,
  recommendation: recommendationReducer,
});

// Exports
export default rootReducer;
