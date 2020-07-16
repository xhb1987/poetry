import React, { FC } from 'react';
import { AppTheme } from 'src/common/types/types';
import { RootPoetModal } from './root-poet-modal';
import { SelectedPoet } from './selected-poet';

export const ViewPoetModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  return (
    <RootPoetModal theme={theme}>
      <SelectedPoet />
    </RootPoetModal>
  );
};
