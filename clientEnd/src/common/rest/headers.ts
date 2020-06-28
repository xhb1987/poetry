import { AjaxRequest } from 'rxjs/ajax';

export const getAuthToken = () => {
  return 'token';
};

export const withAuthenticateHeader = (request: AjaxRequest): AjaxRequest => {
  const { headers = {} } = request;

  const { ['Authorization']: authorization, ...restHeaders } = headers as {
    [key: string]: string;
  };

  if (authorization) {
    return request;
  }

  const token = authorization || getAuthToken();
  const headersWithAuthentication =
    !token || authorization === null ? restHeaders : { ...restHeaders, ['Authorization']: `Bearer ${token}` };

  return {
    ...request,
    headers: headersWithAuthentication,
  };
};
