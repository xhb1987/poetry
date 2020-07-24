import React, { FC, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { AppTheme } from 'src/common/types/types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { TextInput } from 'src/common/component/text-input';
import {
  selectCurrentCollection,
  selectOpenFinishReciteDialog,
  selectReciteCollectionLoading,
} from 'src/state/recites/selectors';
import { recitesActions } from 'src/state/recites/actions';
import { MyButton } from 'src/common/component/button';
import MyText from 'src/common/component/text';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from '@react-navigation/native';
import { routes } from 'src/screen/routes';

Icon.loadFont();

export const FinishReciteModal: FC<{ theme: AppTheme }> = ({ theme }) => {
  const dispatch = useDispatch();
  const currentCollection = useSelector(selectCurrentCollection);

  const isLoading = useSelector(selectReciteCollectionLoading);

  const closeDialog = () => {
    dispatch(recitesActions.closeFinishReciteDialog());
  };

  const openFinishReciteDialog = useSelector(selectOpenFinishReciteDialog);
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const style = getStyle(theme);

  const onConfirmClick = () => {
    dispatch(CommonActions.navigate(routes.home));
    dispatch(recitesActions.closeFinishReciteDialog());
  };

  return (
    <Modal
      backdropOpacity={0.8}
      onBackdropPress={closeDialog}
      isVisible={openFinishReciteDialog}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
    >
      <View style={style.container}>
        <MyText style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>恭喜你</MyText>
        <Icon name="smile-o" color={theme.colors.primary} size={38} style={{ textAlign: 'center', marginBottom: 10 }} />
        <MyText style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>完成了背诵</MyText>
        <MyText style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
          {currentCollection?.name}
        </MyText>
        <MyButton loading={isLoading} theme={theme} type="primary" title="确定" onPress={onConfirmClick} />
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
      justifyContent: 'center',
      flexDirection: 'column',
    },
  });
