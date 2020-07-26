import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyText from 'src/common/component/text';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import { AppTheme } from 'src/common/types/types';
import { useTheme } from '@react-navigation/native';
import { Collection } from 'src/state/recites/types';
import { selectCollectionEdit } from 'src/state/recites/selectors';
import { useSelector } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { MyCheckbox } from 'src/common/component/checkbox';

type CollectionItemProps = {
  isSelected?: boolean;
  collection: Collection;
  collections: Collection[];
  onPress?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  onCollectionCheck?: (collections: Collection[]) => void;
};
export const CollectionItem: FC<CollectionItemProps> = ({
  collection,
  onPress,
  onLongPress,
  onCollectionCheck,
  collections,
}) => {
  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);
  const editMode = useSelector(selectCollectionEdit);
  console.log(editMode);
  const onCheckboxChange = (selected: boolean) => {
    console.log('selected => ', collection);
    if (selected) {
      collections.push(collection);
    } else {
      const selectedCollectionIndex = collections.findIndex((coll) => coll.id === collection.id);
      if (selectedCollectionIndex !== undefined && selectedCollectionIndex >= 0) {
        collections.splice(selectedCollectionIndex, 1);
      }
    }
    onCollectionCheck && onCollectionCheck(collections);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        display: 'flex',
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {editMode && (
        <View style={{ flex: 1, width: 16, height: 16 }}>
          <MyCheckbox onChange={onCheckboxChange} />
        </View>
      )}
      <View style={{ flex: 12 }}>
        <TouchableOpacity style={style.container} onLongPress={onLongPress} onPress={onPress}>
          <MyText>{collection.name}</MyText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignItems: 'center',
      borderColor: theme.colors.primary,
      borderRadius: 5,
      borderWidth: 1,
      borderStyle: 'solid',
      paddingVertical: 12,
    },
  });
