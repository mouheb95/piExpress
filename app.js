var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authenticateJWT = require('./middleware');

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/ourWonderfulDatadatabase';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var carpoolingRouter = require('./routes/carpooling');
<<<<<<< HEAD
var insuranceRouter = require('./routes/insurance');
=======
var claimRouter = require('./routes/claim');
>>>>>>> e7741d16bfdca9274bc5a59eca3a6810bbd3f33c

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter );
app.use('/carpooling', carpoolingRouter );
<<<<<<< HEAD
app.use('/insurance', insuranceRouter );

=======
app.use('/claim', claimRouter);
>>>>>>> e7741d16bfdca9274bc5a59eca3a6810bbd3f33c

app.get('/home', function(req, res){
  //res.send('welcome to your great home')
})


app.post('/checkToken', authenticateJWT, function(req, res) {
  res.sendStatus(200);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

module.exports = app;
