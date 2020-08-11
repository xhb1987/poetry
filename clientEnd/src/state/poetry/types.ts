import { PoetryActions } from './actions';
import { PoetryState } from './reducer';

export type Poetry = {
  id: number;
  author: string;
  title: string;
  paragraphs: string;
  isBookmark?: boolean;
};

export type PoetryDialogType = 'add' | 'view' | 'delete';

export type PoetryRootAction = PoetryActions;
export type PoetryRootState = PoetryState;
