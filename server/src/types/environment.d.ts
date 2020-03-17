declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}

export interface IProcessEnv {
  JWT_SECRET: string;
}
