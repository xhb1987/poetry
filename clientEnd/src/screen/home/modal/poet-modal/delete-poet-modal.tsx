import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyButton } from 'src/common/component/button';
import { AppTheme } from 'src/common/types/types';
import { poetActions } from 'src/state/poet/actions';
import { selectSelectedPoet } from 'src/state/poet/selector';
import { recitesActions } from 'src/state/recites/actions';
import { selectCurrentCollection, selectReciteCollectionLoading } from 'src/state/recites/selectors';
import { PoetModal } from './poet-modal';
import { RootPoetModal } from './root-poet-modal';
import { SelectedPoet } from './selected-poet';

export const DeletePoetModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  const dispatch = useDispatch();
  const collection = useSelector(selectCurrentCollection);
  const selectedPoet = useSelector(selectSelectedPoet);

  const isLoading = useSelector(selectReciteCollectionLoading);

  const deletePoet = () => {
    selectedPoet && collection && dispatch(recitesActions.deletePoetFromCollection(collection.id, selectedPoet.id));
  };

  return (
    <RootPoetModal theme={theme}>
      <SelectedPoet />
      <MyButton
        disabled={isLoading}
        loading={isLoading}
        type="secondary"
        title="删除"
        onPress={deletePoet}
        theme={theme}
      />
    </RootPoetModal>
  );
};
