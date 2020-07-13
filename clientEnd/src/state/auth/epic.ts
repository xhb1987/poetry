import { Epic, combineEpics } from 'redux-observable';
import { filter, tap, pluck, map } from 'rxjs/operators';
import { isActionOf, isOfType } from 'typesafe-actions';
import { RootState } from '../reducer';
import { AuthRootAction, AccessTokenKey } from './types';
import { authActions } from './actions';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, CommonNavigationAction } from '@react-navigation/native';
import { routes } from 'src/screen/routes';
import { USER_LOGIN_SUCCESS, USER_REGISTER_SUCCESS } from 'src/common/rest/actions/authActions';

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

export default combineEpics(authEpic);
