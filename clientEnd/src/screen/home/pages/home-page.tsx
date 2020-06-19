import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../state/user/actions';
import MyText from 'src/common/component/text';
import { EmptyPrompt } from '../component/empty-prompt';
// import MyText from '@src/common/component/text';

export const HomePage = () => {
  const dispatch = useDispatch();
  const onPress = () => dispatch(userActions.userRegister('xxx', 'xxx'));
  return (
    <View>
      <EmptyPrompt />
    </View>
  );
};
