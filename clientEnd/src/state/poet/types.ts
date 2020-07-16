import { PoetActions } from './actions';
import { PoetState } from './reducer';

export type Poet = {
  id: number;
  author: string;
  title: string;
  paragraphs: string;
  isBookmark?: boolean;
};

export type PoetDialogType = 'add' | 'recite' | 'view';

export type PoetRootAction = PoetActions;
export type PoetRootState = PoetState;
