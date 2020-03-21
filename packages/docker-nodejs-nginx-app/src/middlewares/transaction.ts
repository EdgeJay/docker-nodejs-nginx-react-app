import { Next } from 'koa';
import * as uuid from 'uuid';
import { ExtendedContext } from '../types/koa';

export default async (ctx: ExtendedContext, next: Next): Promise<void> => {
  ctx.state = {
    transactionId: uuid.v4(),
  };
  await next();
};
