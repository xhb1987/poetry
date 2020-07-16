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
  const user = useSelector(selectUserState);
  const auth = useSelector(selectAuthState);
  const { username } = user;
  const { isAuthenticated } = auth;

  return username ? <MyText>{username}</MyText> : null;
};
