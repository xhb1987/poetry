import { State } from 'react-native-gesture-handler';
import { createSelector } from 'reselect';
import { RootState } from '../reducer';

export const selectNotification = (state: RootState) => state.notification;

export const selectNotificationInfo = (state: RootState) => selectNotification(state).info;
export const selectNotificationMessage = (state: RootState) => selectNotification(state).message;
export const selectNotificationTitle = (state: RootState) => selectNotification(state).title;
