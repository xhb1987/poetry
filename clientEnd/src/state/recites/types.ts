import { Poet } from 'src/state/poet/types';
import { StateType } from 'typesafe-actions';
import { reciteCollectionsReducer } from './reducer';

export type Collection = {
  id: number;
  name: string;
  poet: Poet[];
};

export type ReciteCollectionsReducer = {
  collections?: Collection[];
  loading: boolean;
  error: boolean;
  openAddCollectionDialog: boolean;
  selectedReciteCollection?: Collection;
};

export type ReciteCollectionRootState = StateType<typeof reciteCollectionsReducer>;
