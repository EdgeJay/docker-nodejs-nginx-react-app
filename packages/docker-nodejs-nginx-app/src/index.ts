import Koa from 'koa';
import { initDotEnv, getNodePort } from './core/env';

function start(): void {
  const app = new Koa();

  // fetch and setup dotenv vars
  const env = initDotEnv();

  if (env) {
    /**
     * env variables are deliberately passed into subsequent function calls
     * to prevent direct references to process.env in functions, which can
     * make testing difficult. It also makes parts of codebase tightly coupled
     * with process.env.
     */

    // initRoutes(app);

    app.use(ctx => {
      ctx.body = 'Hello world!';
    });

    const port = getNodePort(env);
    app.listen(port, (): void => {
      // eslint-disable-next-line
      console.log(`Server started listening at port ${port}`);
    });
  } else {
    throw new Error('Missing dotenv configuration');
  }
}

start();
