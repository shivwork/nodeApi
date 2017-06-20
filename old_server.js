var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

/******************    connect to our database    ********************/
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/food_delivery');

var User     = require('./app/models/user');
var Item     = require('./app/models/item');



/******************    Api Routers          ********************/
var userRouter = require('./app/user');
var loginRouter = require('./app/login');
var registerRouter = require('./app/register');
var itemRouter  = require('./app/item');

// create our router
var router = express.Router();
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

/**************************            Home             ****************************/
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/register', registerRouter);
app.use('/items', itemRouter);

app.listen(port);
console.log('Server Listning on port: ' + port);
