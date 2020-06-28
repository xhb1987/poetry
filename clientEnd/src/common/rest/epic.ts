import { Epic, ofType, combineEpics } from 'redux-observable';
import { AjaxCreationMethod, AjaxError } from 'rxjs/internal/observable/dom/AjaxObservable';
import { restActions, RestAction } from './actions/restActions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { withAuthenticateHeader } from './headers';
import { Action } from 'typesafe-actions';

const restCall: Epic = (action$, state$, { ajax }: { ajax: AjaxCreationMethod }) =>
  action$.pipe(
    ofType<RestAction>(...restActions),
    switchMap((action) => {
      const {
        type,
        payload: { onError, onSuccess, request },
      } = action;

      return of(request).pipe(
        map(withAuthenticateHeader),
        switchMap((request) =>
          ajax({ ...request })
            .pipe(map((response) => onSuccess(response.response, response)))
            .pipe(catchError((err: AjaxError) => of(onError(err))))
        )
      );
    })
  );

export default combineEpics(restCall);