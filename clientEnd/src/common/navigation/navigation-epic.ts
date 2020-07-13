import { Epic, ofType, combineEpics } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';
import { CommonNavigationAction } from '@react-navigation/native';
import * as RootNavigation from './root-navigation';

const navigation: Epic<CommonNavigationAction, CommonNavigationAction> = (action$) =>
  action$.pipe(
    ofType<CommonNavigationAction>('NAVIGATE'),
    tap((prop) => {
      const {
        payload: { name, params },
      } = prop as { type: string; payload: { name: string; params: Object } };
      RootNavigation.navigate(name, params);
    }),
    ignoreElements()
  );

const goBack: Epic<CommonNavigationAction, CommonNavigationAction> = (action$) =>
  action$.pipe(
    ofType<CommonNavigationAction>('GO_BACK'),
    tap(() => RootNavigation.goBack()),
    ignoreElements()
  );

export default combineEpics(navigation, goBack);
