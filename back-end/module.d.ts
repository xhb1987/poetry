declare namespace NodeJS {
  export interface ProcessEnv {
    SECRET: string;
    LOGGER_NAME: string;
    PORT: string;
    DATABASE_TYPE: "mysql";
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
  }
}
