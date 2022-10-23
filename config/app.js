/*name:Rohit Rana
  student id:301239904
  Date:30/09/2022
*/


var bodyParser= require('body-parser')
var express = require('express');
var path = require('path');
var logger = require('morgan');
var index = require('../routes/index');
var app = express();

//view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash'); 

// database setup
let mongoose = require('mongoose');
let DB = require('./db');
const contact = require('../models/contact');

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

let contactRouter = require('../routes/contact');

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

// create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

//strategy
passport.use(User.createStrategy());

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, '../public')));


// routes
app.use('/', index);
app.use('/contact-list',contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});

module.exports = app;
