import React, { FC } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { recitesActions } from 'src/state/recites/actions';
import { selectCollectionEdit, selectUnfinishedCollections } from 'src/state/recites/selectors';
Icon.loadFont();

export const EditButton: FC = () => {
  const dispatch = useDispatch();
  const editMode = useSelector(selectCollectionEdit);
  const unfinishedCollections = useSelector(selectUnfinishedCollections);

  const editCollection = () => {
    editMode ? dispatch(recitesActions.editCollectionEnd()) : dispatch(recitesActions.editCollectionStart());
  };
  const theme = useTheme();

  if (unfinishedCollections.length <= 0) {
    return null;
  }
  return (
    <View style={{ paddingLeft: 10 }}>
      <Icon size={28} name="playlist-edit" color={theme.colors.primary} onPress={editCollection} />
    </View>
  );
};
