const Router = require("koa-router");
const Boom = require('boom');

module.exports = async function createRouter() {
  const router = new Router();

  // View endpoints
  router.get("/", async ctx => {
    // You can `await` or `return` the ctx.render function call
    await ctx.render({
      screen: "Home",
    });
  });

  router.get("/comments", async ctx => {
    const comments = ctx.session.comments || [];
    return ctx.render({
      screen: "Comments",
      props: { comments },
    });
  });

  // API endpoints
  router.get("/api/comments", async ctx => {
    ctx.session.comments = ctx.session.comments || [];
    ctx.body = ctx.session.comments;
  });

  router.post("/api/comments", async ctx => {
    ctx.session.comments = ctx.session.comments || [];

    if (!ctx.request.body["comment"]) {
      throw Boom.badData("Empty comments not allowed");
    }

    const comment = {
      date: new Date(),
      comment: ctx.request.body["comment"],
    };
    ctx.session.comments.push(comment);
    ctx.status = 201;
    ctx.body = comment;
  });

  return router;
};
