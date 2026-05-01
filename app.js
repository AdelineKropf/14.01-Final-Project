// Main Express application setup for Downtown Donuts
// Handles routing, middleware, static files, database access, and error pages

const express = require('express');
const path = require('path');
const { dbMiddleware} = require('./bin/db');

// Route handlers
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Global template variable
app.locals.title = "Downtown Donuts";

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(dbMiddleware);

// Route handlers
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const createError = require('http-errors');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export configured express app
module.exports = app;
