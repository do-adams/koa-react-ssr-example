const Router = require("koa-router");
const nextjs = require("next");

module.exports = async function setupSSR(app) {
  const nextEngine = nextjs({ dev: process.env.NODE_ENV !== "production" });
  const handle = nextEngine.getRequestHandler();
  await nextEngine.prepare();

  // eslint-disable-next-line no-param-reassign
  app.context.render = async function render({ screen, props = {}, options }) {
    const ctx = this;

    // https://github.com/zeit/next.js/blob/canary/server/render.js
    const html = await nextEngine.renderToHTML(
      ctx.req,
      ctx.res,
      `/${screen}`,
      props,
      options,
    );
    ctx.body = html;
    return html;
  };

  // eslint-disable-next-line no-param-reassign
  app.context.renderBoomError = async function renderBoomError(err) {
    const ctx = this;

    const {
      output: { payload },
    } = err;
    ctx.status = payload.statusCode || 500;

    return ctx.render({
      screen: ctx.status >= 500 ? "errors/500" : "errors/400",
      props: {
        statusCode: payload.statusCode,
        error: payload.error,
        message: payload.message,
      },
      options: {
        staticMarkup: true,
      },
    });
  };

  const router = new Router();

  router.get("/_next/*", async ctx => {
    ctx.respond = false;
    await handle(ctx.req, ctx.res);
  });

  app.use(router.routes());

  return app;
};
