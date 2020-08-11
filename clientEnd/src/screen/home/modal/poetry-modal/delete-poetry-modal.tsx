import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyButton } from 'src/common/component/button';
import { AppTheme } from 'src/common/types/types';
import { poetryActions } from 'src/state/poetry/actions';
import { selectSelectedPoetry } from 'src/state/poetry/selectors';
import { recitesActions } from 'src/state/recites/actions';
import { selectCurrentCollection, selectReciteCollectionLoading } from 'src/state/recites/selectors';
import { RootPoetryModal } from './root-poetry-modal';
import { SelectedPoetry } from './selected-poetry';

export const DeletePoetModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  const dispatch = useDispatch();
  const collection = useSelector(selectCurrentCollection);
  const selectedPoetry = useSelector(selectSelectedPoetry);

  const isLoading = useSelector(selectReciteCollectionLoading);

  const deletePoet = () => {
    selectedPoetry && collection && dispatch(recitesActions.deletePoetFromCollection(collection.id, selectedPoetry.id));
  };

  return (
    <RootPoetryModal theme={theme}>
      <SelectedPoetry />
      <MyButton
        disabled={isLoading}
        loading={isLoading}
        type="secondary"
        title="删除"
        onPress={deletePoet}
        theme={theme}
      />
    </RootPoetryModal>
  );
};
