import { PoetActions } from './actions';
import { PoetState } from './reducer';

export type Poet = {
  id: number;
  author: string;
  title: string;
  paragraphs: string;
  isBookmark?: boolean;
};

export type PoetDialogType = 'add' | 'view' | 'delete';

export type PoetRootAction = PoetActions;
export type PoetRootState = PoetState;
