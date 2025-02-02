module.exports = function (app) {
    app.get('/', (_, res) => res.send("Hello World"));
    app.use('/api/auth', require('../router/auth'));
    app.use('/api/posts', require('../router/post'));
};
