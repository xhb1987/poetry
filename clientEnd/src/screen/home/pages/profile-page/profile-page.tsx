import React from 'react';
import { PageView } from 'src/common/component/page-view';
import { UserName } from './component/user-name';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthState } from 'src/state/auth/selectors';
import { MyButton } from 'src/common/component/button';
import { authActions } from 'src/state/auth/actions';
import { View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { routes } from 'src/screen/routes';
import { CollectionSection } from './component/collection-section';

export const ProfilePage = () => {
  return (
    <PageView>
      <View style={{ height: '100%', alignContent: 'center', justifyContent: 'center' }}>
        <UserName />
        <CollectionSection />
      </View>
    </PageView>
  );
};
