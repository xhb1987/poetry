import React from 'react';
import MyText from 'src/common/component/text';
import { PageView } from 'src/common/component/page-view';
import { UserName } from './component/user-name';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthState } from 'src/state/auth/selectors';
import { MyButton } from 'src/common/component/button';
import { authActions } from 'src/state/auth/actions';
import { View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { routes } from 'src/screen/routes';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuthState);
  const { isAuthenticated, loading } = auth;
  const navigation = useNavigation();
  const goToLogin = () => navigation.navigate(routes.login);

  const logout = () => {
    dispatch(authActions.userLogout());
  };

  const theme = useTheme();
  return (
    <PageView>
      {!isAuthenticated && (
        <View style={{ justifyContent: 'center' }}>
          {/* <MyText
            style={{
              color: theme.colors.primary,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            请先登录
          </MyText> */}
          <MyButton type="primary" title="登录" onPress={goToLogin} />
        </View>
      )}
      <UserName />
      {isAuthenticated && <MyButton loading={loading} type="secondary" onPress={logout} title="退出" />}
    </PageView>
  );
};
