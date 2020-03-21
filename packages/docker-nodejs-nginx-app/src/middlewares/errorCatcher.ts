import { ExtendableContext, Next } from 'koa';
import ServerError from '../errors/ServerError';

export default async (ctx: ExtendableContext, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ServerError) {
      const error = err as ServerError;
      ctx.body = error.toJson();
      ctx.status = error.statusCode;
      ctx.type = 'application/json;charset=utf-8';
      ctx.log.error(`${err.name} - ${err.message}`, { error: err });
    } else {
      ctx.status = 500;
      ctx.log.error('Unknown server error', { trace: err.stack });
    }
  }
};
