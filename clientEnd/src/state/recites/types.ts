import { Poet } from 'src/state/poet/types';
import { StateType } from 'typesafe-actions';
import { reciteCollectionsReducer } from './reducer';
import { RecitesActions } from './actions';

export type Collection = {
  id: number;
  name: string;
  poet: Poet[];
  isFinished: boolean;
};

export type ReciteCollectionsReducer = {
  collections?: Collection[];
  loading: boolean;
  error: boolean;
  openAddCollectionDialog: boolean;
  selectedReciteCollection?: Collection;
};
export type ReciteCollectionRootAction = RecitesActions;

export type ReciteCollectionRootState = StateType<typeof reciteCollectionsReducer>;
