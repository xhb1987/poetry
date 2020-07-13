import React, { FC, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getAuthToken } from '../rest/headers';
import { authActions } from 'src/state/auth/actions';

export const Authentication: FC = () => {
  const dispatch = useDispatch();
  const getToken = useCallback(async () => {
    const token = await getAuthToken();
    return token;
  }, []);
  //   console.log('xxxxxxx');
  //   console.log('token => ', getToken());
  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(authActions.userLoginByToken());
    }
  }, []);
  console.log('xxxxxx');
  return null;
};
