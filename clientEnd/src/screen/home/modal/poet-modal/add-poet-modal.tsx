import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyButton } from 'src/common/component/button';
import { AppTheme } from 'src/common/types/types';
import { poetActions } from 'src/state/poet/actions';
import { selectSelectedPoet } from 'src/state/poet/selector';
import { recitesActions } from 'src/state/recites/actions';
import { selectCurrentCollection } from 'src/state/recites/selectors';
import { PoetModal } from './poet-modal';
import { RootPoetModal } from './root-poet-modal';
import { SelectedPoet } from './selected-poet';

export const AddPoetModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  const dispatch = useDispatch();
  const collection = useSelector(selectCurrentCollection);
  const selectedPoet = useSelector(selectSelectedPoet);

  const isSelectedPoetInCollection = collection?.poets.some((poet) => poet.id === selectedPoet?.id);

  const addPoet = () => {
    selectedPoet && collection && dispatch(recitesActions.addPoetToCollection(selectedPoet, collection));
  };

  return (
    <RootPoetModal theme={theme}>
      <SelectedPoet />
      <MyButton disabled={isSelectedPoetInCollection} type="primary" title="添加" onPress={addPoet} theme={theme} />
    </RootPoetModal>
  );
};
