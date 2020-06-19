import { combineEpics } from 'redux-observable';
import userEpic from './user/epic';

export default combineEpics(userEpic);
