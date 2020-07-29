import { combineEpics } from 'redux-observable';
import userEpic from './user/epic';
import restEpic from 'src/common/rest/epic';
import navigationEpic from 'src/common/navigation/navigation-epic';
import reciteEpic from './recites/epic';
import authEpic from './auth/epic';
import recommendationEpic from './recommendation/epic';

export default combineEpics(navigationEpic, userEpic, restEpic, authEpic, reciteEpic, recommendationEpic);
