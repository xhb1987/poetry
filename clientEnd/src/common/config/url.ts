type Env = 'development' | 'stage';

const requestUrl: { [key in Env]: string } = {
  development: 'http://localhost:3001',
  stage: 'http://localhost:3001',
};

export const getEnvironment = (env: Env) => requestUrl[env];
