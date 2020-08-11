import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectPoetryDialogType } from 'src/state/poetry/selectors';
import { AppTheme } from 'src/common/types/types';

import { PoetryDialogType } from 'src/state/poetry/types';
import { AddPoetModal } from './add-poetry-modal';
import { ViewPoetryModal } from './view-poetry-modal';
import { DeletePoetModal } from './delete-poetry-modal';

export const PoetryModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  const poetryModal: { [key in PoetryDialogType]: React.ReactNode } = {
    add: <AddPoetModal theme={theme} />,
    view: <ViewPoetryModal theme={theme} />,
    delete: <DeletePoetModal theme={theme} />,
  };

  const poetryDialogType = useSelector(selectPoetryDialogType);

  if (poetryDialogType === undefined) {
    return null;
  }

  return <>{poetryModal[poetryDialogType]}</>;
};
