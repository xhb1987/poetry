import React, { FC, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getAuthToken } from '../rest/headers';
import { authActions } from 'src/state/auth/actions';

export const Authentication: FC = () => {
  const dispatch = useDispatch();
  const getToken = useCallback(async () => {
    const token = await getAuthToken();
    if (token) {
      dispatch(authActions.userLoginByToken());
    }
    return token;
  }, []);
  //   console.log('xxxxxxx');
  //   console.log('token => ', getToken());
  useEffect(() => {
    getToken();
  }, []);
  return null;
};
