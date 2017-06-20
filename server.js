var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var passport = require('passport');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

/******************    connect to our database    ********************/
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/food_delivery');

// Authentication passport
app.use(passport.initialize());
app.use(passport.session());


// create our router
var router = express.Router();
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

/******************    Routes    ********************/
app.use('/login', require('./app/login'));
app.use('/users', require('./app/user'));
app.use('/register', require('./app/register'));
app.use('/items', require('./app/item'));

/*app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    return next();
});*/

app.listen(port);
console.log('Server Listning on port: ' + port);
