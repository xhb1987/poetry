import { Epic, combineEpics } from 'redux-observable';
import { filter, tap, pluck, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootState } from '../reducer';
import { AuthRootAction, AccessTokenKey } from './types';
import { authActions } from './actions';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, CommonNavigationAction } from '@react-navigation/native';
import { routes } from 'src/screen/routes';
import { asapScheduler, scheduled } from 'rxjs';

export const authEpic: Epic<
  AuthRootAction | CommonNavigationAction,
  AuthRootAction | CommonNavigationAction,
  RootState
> = (action$) =>
  action$.pipe(
    filter(isActionOf([authActions.userLoginSuccess, authActions.userRegisterSuccess])),
    pluck('payload'),
    tap(({ access_token }) => AsyncStorage.setItem(AccessTokenKey, access_token)),
    map(() => CommonActions.navigate(routes.home))
  );

export const authLogoutEpic: Epic<AuthRootAction | CommonNavigationAction, AuthRootAction | CommonNavigationAction> = (
  action$
) =>
  action$.pipe(
    filter(isActionOf(authActions.userLogoutSuccess)),
    tap(async () => await AsyncStorage.removeItem(AccessTokenKey)),
    mergeMap(() => scheduled([CommonActions.navigate(routes.home), authActions.clearError()], asapScheduler))
  );

export default combineEpics(authEpic, authLogoutEpic);
