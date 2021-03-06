const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/search", { target: "http://localhost:5000/" }));
  app.use(proxy("/auth", { target: "http://localhost:5000/" }));
  app.use(proxy("/user", { target: "http://localhost:5000/" }));
};
