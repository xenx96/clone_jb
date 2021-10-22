import express from 'express';
const app = express();
const statics = express.static;

import nunjucks from 'nunjucks'; //Templates Engines.
const { configure } = nunjucks;
import morgan from 'morgan'; //Logging Tools
import path, { join } from 'path'; //path
const __dirname = path.resolve();
import { connect } from './schemas/index.js';
import { swaggerUI, specs } from './swagger_test/swagger.js';
import dotenv from 'dotenv';

//Import Router
import companyRouter from './routes/company.js';
import pageRouter from './routes/page.js';
import loginRouter from './routes/login.js';
/**
 * App.set
 * Setting App(express)! Like; Port or Engines etc..
 */
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');
configure('views', {
    express: app,
    watch: true,
});
dotenv.config();
connect();

app.use(morgan('dev'));
app.use(statics(join(__dirname, 'public')));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));

/**
 * CallBack Router.
 */

/**
 * Set Router like; /join or /main
 */

app.use('/', pageRouter);
app.use('/company', companyRouter);
app.use('/login', loginRouter);

app.use(function (req, res, next) {
    const error = new Error(`${req.method}${req.url} NO Router`);
    error.status = 404;
    next(error);
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '-Port is Ready!');
});
