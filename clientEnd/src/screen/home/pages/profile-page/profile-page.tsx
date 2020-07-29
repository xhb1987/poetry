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
  const dispatch = useDispatch();
  const auth = useSelector(selectAuthState);
  const { isAuthenticated, loading } = auth;
  const navigation = useNavigation();
  const goToLogin = () => navigation.navigate(routes.login);

  const theme = useTheme();
  return (
    <PageView>
      {!isAuthenticated && (
        <View style={{ justifyContent: 'center' }}>
          <MyButton type="primary" title="登录" onPress={goToLogin} />
        </View>
      )}

      {isAuthenticated && (
        <View style={{ height: '100%', alignContent: 'center', justifyContent: 'center' }}>
          <UserName />
          <CollectionSection />
        </View>
      )}
    </PageView>
  );
};
