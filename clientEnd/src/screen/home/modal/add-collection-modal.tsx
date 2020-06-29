import React, { FC, useState } from 'react';
import MyText from 'src/common/component/text';
import { View, Dimensions, StyleSheet, Keyboard } from 'react-native';
import { AppTheme } from 'src/common/types/types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { TextInput } from 'src/common/component/text-input';
import {
  selectAddCollectionDialog,
  selectReciteCollectionLoading,
  selectReciteCollectionError,
} from 'src/state/recites/selectors';
import { recitesActions } from 'src/state/recites/actions';
import { MyButton } from 'src/common/component/button';

export const ADdCollectionModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  const dispatch = useDispatch();

  const [collectionName, setCollectionName] = useState('');

  const isLoading = useSelector(selectReciteCollectionLoading);
  const hasError = useSelector(selectReciteCollectionError);

  const closeDialog = () => {
    dispatch(recitesActions.closeAddCollectionDialog());
  };

  const onCollectionNameUpdate = (text: string) => {
    setCollectionName(text);
  };

  const submitCollectionName = () => {
    dispatch(recitesActions.addCollection(collectionName));
    Keyboard.dismiss();
  };

  const addCollectionDialog = useSelector(selectAddCollectionDialog);
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const style = getStyle(theme);

  return (
    <Modal
      backdropOpacity={0.8}
      onBackdropPress={closeDialog}
      isVisible={addCollectionDialog}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
    >
      <View style={style.container}>
        <TextInput style={style.input} theme={theme} placeholder="请添加名字" onChangeText={onCollectionNameUpdate} />
        <MyButton
          disabled={isLoading}
          loading={isLoading}
          theme={theme}
          type="primary"
          title="确定"
          onPress={submitCollectionName}
        />
      </View>
    </Modal>
  );
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 5,
      borderStyle: 'solid',
      padding: 16,
      minHeight: 128,
      justifyContent: 'space-between',
    },

    input: {
      //   maxHeight: 18,
      borderColor: 'black',
      fontSize: 18,
      //   marginBottom: 18,
    },
  });
