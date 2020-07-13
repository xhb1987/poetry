import { AjaxRequest } from 'rxjs/ajax';
import AsyncStorage from '@react-native-community/async-storage';
import { AccessTokenKey } from 'src/state/auth/types';

export const getAuthToken = async () => {
  const token = await AsyncStorage.getItem(AccessTokenKey);
  return token;
};

export const withAuthenticateHeader = async (request: AjaxRequest): Promise<AjaxRequest> => {
  const { headers = {} } = request;

  const { ['Authorization']: authorization, ...restHeaders } = headers as {
    [key: string]: string;
  };

  console.log(authorization);
  if (authorization) {
    return request;
  }

  const token = authorization || (await getAuthToken());

  const headersWithAuthentication =
    !token || authorization === null ? restHeaders : { ...restHeaders, ['Authorization']: `Bearer ${token}` };

  return {
    ...request,
    headers: headersWithAuthentication,
  };
};

export const withContentTypeHeader = (request: AjaxRequest) => {
  const { ['Content-Type']: contentType = 'application/json', ...restHeaders } = (request.headers || {}) as {
    [key: string]: string;
  };
  const headers =
    contentType === null ? restHeaders : { ...restHeaders, ['Content-Type']: `${contentType};charset=utf-8` };

  return {
    ...request,
    headers,
  };
};
