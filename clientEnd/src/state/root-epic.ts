import { combineEpics } from 'redux-observable';
import userEpic from './user/epic';
import restEpic from 'src/common/rest/epic';
export default combineEpics(userEpic, restEpic);
