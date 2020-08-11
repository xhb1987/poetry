import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyButton } from 'src/common/component/button';
import { AppTheme } from 'src/common/types/types';
import { poetryActions } from 'src/state/poetry/actions';
import { selectSelectedPoetry } from 'src/state/poetry/selectors';
import { recitesActions } from 'src/state/recites/actions';
import { selectCurrentCollection } from 'src/state/recites/selectors';
import { RootPoetryModal } from './root-poetry-modal';
import { SelectedPoetry } from './selected-poetry';

export const AddPoetModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  const dispatch = useDispatch();
  const collection = useSelector(selectCurrentCollection);
  const selectedPoetry = useSelector(selectSelectedPoetry);

  const isSelectedPoetInCollection = collection?.poetries.some((poetry) => poetry.id === selectedPoetry?.id);

  const addPoet = () => {
    selectedPoetry && collection && dispatch(recitesActions.addPoetryToCollection(collection.id, selectedPoetry.id));
  };

  return (
    <RootPoetryModal theme={theme}>
      <SelectedPoetry />
      <MyButton disabled={isSelectedPoetInCollection} type="primary" title="添加" onPress={addPoet} theme={theme} />
    </RootPoetryModal>
  );
};
