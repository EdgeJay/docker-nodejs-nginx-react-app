import { ParameterizedContext } from 'koa';

declare module 'koa' {
  interface BodyInput {
    [key: string]: unknown;
  }

  interface JsonInputParams {
    body?: BodyInput;
    statusCode?: number;
  }

  interface ExtendableContext {
    json: (params: JsonInputParams) => void;
  }
}

export interface ExtendedState {
  transactionId: string;
}

export type ExtendedContext = ParameterizedContext<ExtendedState>;
