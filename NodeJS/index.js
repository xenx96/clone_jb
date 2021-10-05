const express = require('express');
const app = express();
const nunjucks = require('nunjucks'); //Templates Engines. 
const morgan = require('morgan'); //Logging Tools
const path = require('path'); //path
const connect = require('./schemas');
/**
 * App.set 
 * Setting App(express)! Like; Port or Engines etc..
 */
app.set('port', process.env.PORT || 8080)
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch : true
});
connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Set Router like; /join or /main
 */
 const pageRouter = require("./routes/page");

 app.use('/',pageRouter);




 app.use(function(req, res, next) {
    const error = new Error(`${req.method}${req.url} NO Router`);
    error.status = 404;
    next(error);
  });
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'-Port is Ready!')
})