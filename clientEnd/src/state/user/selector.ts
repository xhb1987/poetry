import { RootState } from '../reducer';
import { createSelector } from 'reselect';

export const selectUserState = (state: RootState) => state.user;

// export const selectUserProfile = createSelector(selectUserState, (user) => user.profile);

// export const selectReciteCollections = createSelector(selectUserProfile, (profile) => profile.recites);
// export const selectReciteCollectionPoets = createSelector(
//   selectUserState,
//   (user) => user.selectedReciteCollection?.poet || []
// );

// export const selectFinished = createSelector(selectUserProfile, (profile) => profile.finished);
