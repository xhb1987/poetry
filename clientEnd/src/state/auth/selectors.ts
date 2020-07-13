import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectAuthState = (state: RootState) => state.auth;
