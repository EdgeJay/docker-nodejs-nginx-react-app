import Koa from 'koa';
import logger from 'koa-pino-logger';

export function initLogger(app: Koa): void {
  app.use(
    logger({
      name: 'tchr',
    })
  );
}
