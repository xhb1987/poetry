import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectPoetDialogType } from 'src/state/poet/selectors';
import { AppTheme } from 'src/common/types/types';

import { PoetDialogType } from 'src/state/poet/types';
import { AddPoetModal } from './add-poet-modal';
import { ViewPoetModal } from './view-poet-modal';
import { DeletePoetModal } from './delete-poet-modal';

export const PoetModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  const poetModal: { [key in PoetDialogType]: React.ReactNode } = {
    add: <AddPoetModal theme={theme} />,
    view: <ViewPoetModal theme={theme} />,
    delete: <DeletePoetModal theme={theme} />,
  };

  const poetDialogType = useSelector(selectPoetDialogType);

  if (poetDialogType === undefined) {
    return null;
  }

  return <>{poetModal[poetDialogType]}</>;
};
