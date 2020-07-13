import React from 'react';
import MyText from 'src/common/component/text';
import { PageView } from 'src/common/component/page-view';
import { UserName } from './component/user-name';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthState } from 'src/state/auth/selectors';
import { MyButton } from 'src/common/component/button';
import { authActions } from 'src/state/auth/actions';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuthState);
  const { isAuthenticated, loading } = auth;
  const logout = () => {
    dispatch(authActions.userLogout());
  };
  return (
    <PageView>
      <UserName />
      {!isAuthenticated && <MyButton loading={loading} type="secondary" onPress={logout} title="退出" />}
    </PageView>
  );
};
