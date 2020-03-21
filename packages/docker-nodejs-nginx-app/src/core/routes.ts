import Koa, { Next } from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import errorCatcher from '../middlewares/errorCatcher';
import transaction from '../middlewares/transaction';
import hello from '../controllers/api/hello';
import { ExtendedContext, ExtendedState } from '../types/koa';
import ApiError, { ApiErrorCode } from '../errors/ApiError';

/**
 * This function will provide router that handles /api/* requests
 * Add api routes here
 */
function initApiRoutes(): Router<ExtendedState> {
  const apiRouter = new Router<ExtendedState>();

  apiRouter.use(transaction);
  apiRouter.use(errorCatcher);
  apiRouter.get('/hello', hello);

  return apiRouter;
}

/**
 * Use this function to json response helper to Koa context object
 * passed into each request calls.
 */
export function jsonResponseHelper() {
  // adds json response helper
  return async (ctx: ExtendedContext, next: Next): Promise<void> => {
    ctx.json = ({ body, statusCode = 200 } = {}): void => {
      if (!(statusCode === 204 || statusCode === 205)) {
        ctx.body = body;
      }
      ctx.type = 'application/json;charset=utf-8';
      ctx.status = statusCode;
    };

    await next();
  };
}

/**
 * Use this function to add routes to Koa app
 *
 * @param {object} app Koa app instance
 */
export function initRoutes(app: Koa): void {
  app.use(jsonResponseHelper());

  // bodyParser helps to parse request body and store it under ctx.request.body
  app.use(
    bodyParser({
      enableTypes: ['json'],
      onerror: (err: Error, context: Koa.Context) => {
        const ctx = context as ExtendedContext;
        const apiError = new ApiError(ApiErrorCode.UNACCEPTABLE_CONTENT_TYPE);
        ctx.json({ body: { ...apiError.toJson() }, statusCode: apiError.statusCode });
      },
    })
  );

  const router = new Router<ExtendedState>();
  const apiRouter = initApiRoutes();

  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

  app.use(router.routes());
}
