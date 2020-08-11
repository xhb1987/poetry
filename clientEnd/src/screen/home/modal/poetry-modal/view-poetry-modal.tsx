import React, { FC } from 'react';
import { AppTheme } from 'src/common/types/types';
import { RootPoetryModal } from './root-poetry-modal';
import { SelectedPoetry } from './selected-poetry';

export const ViewPoetryModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  return (
    <RootPoetryModal theme={theme}>
      <SelectedPoetry />
    </RootPoetryModal>
  );
};
