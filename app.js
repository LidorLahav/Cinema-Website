var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginController = require('./routes/login');
var logoutController = require('./routes/logout');
var createAccountController = require('./routes/createAccount');
var mainPageController = require('./routes/mainPage');
var usersManagementPageController = require('./routes/usersManagementPage');
var allUsersController = require('./routes/allUsers');
var addUserController = require('./routes/addUser');
var editUserController = require('./routes/editUser');
var moviePageController = require('./routes/moviesPage');
var allMoviesController = require('./routes/allMovies');
var editMovieController = require('./routes/editMovie');
var addMovieController = require('./routes/addMovie');
var addMemberController = require('./routes/addMember');
var subscriptionsPageController = require('./routes/subscriptionsPage');
var allMembersController = require('./routes/allMembers');
var editMemberController = require('./routes/editMember');
// var addMovieController = require('./routes/addMovie');


var session = require('express-session')

var app = express();

app.use(session({
  secret: 'My Secret',
  resave: true,
  //cookie: { expires: 20 * 100000 },
  saveUninitialized: true,
  rolling: true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./configs/database');

app.use('/', indexRouter);
app.use('/login', loginController);
app.use('/logout',logoutController);
app.use('/createAccount', createAccountController);
app.use('/mainPage', mainPageController);
app.use('/usersManagementPage', usersManagementPageController);
app.use('/allUsers', allUsersController);
app.use('/addUser', addUserController);
app.use('/editUser', editUserController);
app.use('/moviesPage', moviePageController);
app.use('/allMovies', allMoviesController);
app.use('/editMovie', editMovieController);
app.use('/addMovie', addMovieController);
app.use('/addMember', addMemberController);
app.use('/subscriptionsPage', subscriptionsPageController);
app.use('/allMembers', allMembersController);
app.use('/editMember', editMemberController);

// app.use('/addMovie' ,addMovieController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
