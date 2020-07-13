import React, { FC } from 'react';
import MyText from 'src/common/component/text';
import { useSelector } from 'react-redux';
import { selectUserState } from 'src/state/user/selector';
import { MyButton } from 'src/common/component/button';
import { useNavigation } from '@react-navigation/native';
import { routes } from 'src/screen/routes';
import { ProfileItem } from './profile-items';
import { selectAuthState } from 'src/state/auth/selectors';

export const UserName: FC = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUserState);
  const auth = useSelector(selectAuthState);
  const { username } = user;
  const { isAuthenticated } = auth;
  const goToLogin = () => navigation.navigate(routes.login);

  return (
    <ProfileItem>
      {isAuthenticated ? <MyText>{username}</MyText> : <MyButton type="primary" title="登录" onPress={goToLogin} />}
    </ProfileItem>
  );
};
