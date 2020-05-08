var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authenticateJWT = require('./middleware');

const multer = require('multer');


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/ourWonderfulDatadatabase';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var scrapingRouter = require('./routes/scraping');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var carpoolingRouter = require('./routes/carpooling');
var insuranceRouter = require('./routes/insurance');
var claimRouter = require('./routes/claim');

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
app.use('/insurance', insuranceRouter );
app.use('/scraping', scrapingRouter );
app.use('/uploads',express.static('uploads'))

app.use('/claim', claimRouter);

app.get('/home', function(req, res){
  //res.send('welcome to your great home')
})


const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, `FunOfHeuristic_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

//let upload = multer({ dest: 'uploads/' })

app.get("/", (req, res) => {
  res.send(
    `<h1 style='text-align: center'>
          Wellcome to FunOfHeuristic 
          <br><br>
          <b style="font-size: 182px;">😃👻</b>
      </h1>`
  );
});

app.post('/file', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file);
})


app.post('/multipleFiles', upload.array('files'), (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (!files) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send({sttus:  'ok'});
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
