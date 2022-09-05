const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://175.207.12.32/:3000',
          changeOrigin: true,
          pathRewrite: {
              '^/api': '' // URL ^/api -> 공백 변경
          }
      })
  );
};