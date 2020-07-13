import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import { ajax } from 'rxjs/ajax';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './root-epic';
import rootReducer, { RootActions, RootState } from './reducer';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
};

const initialState = {};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const dependencies = { ajax };
const epicMiddleware = createEpicMiddleware<RootActions, RootActions, RootState>({ dependencies });

const middleware = applyMiddleware(createLogger(), thunk, epicMiddleware);

export const store = createStore(persistedReducer, initialState, compose(middleware));

epicMiddleware.run(rootEpic);
