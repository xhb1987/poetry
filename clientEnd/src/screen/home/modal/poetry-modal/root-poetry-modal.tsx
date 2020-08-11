import React, { FC } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectPoetryDialog } from 'src/state/poetry/selectors';
import Modal from 'react-native-modal';
import { poetryActions } from 'src/state/poetry/actions';
import { AppTheme } from 'src/common/types/types';

export const RootPoetryModal: FC<{ theme: AppTheme }> = ({ theme, children }) => {
  const dispatch = useDispatch();
  const poetDialog = useSelector(selectPoetryDialog);

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  const style = getStyle(theme);

  const closeDialog = () => {
    dispatch(poetryActions.closePoetryDialog());
  };

  return (
    <Modal
      backdropOpacity={0.8}
      onBackdropPress={closeDialog}
      isVisible={poetDialog}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
    >
      <View style={style.container}>{children}</View>
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
    },
    contentContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: Dimensions.get('window').height * 0.6,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    author: {
      paddingVertical: 16,
    },
    content: {
      paddingVertical: 5,
      fontSize: 18,
    },
  });
