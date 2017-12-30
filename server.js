// =======================
// get the packages we need ============
// =======================
const express = require('express');
const app = express();
const apiRoutes = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const serverHelper = require('./server-helper');

const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./app/models/user');

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8080;

mongoose.connect(config.database, { useMongoClient: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
// API ROUTES -------------------
apiRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to authenticate a user
apiRoutes.post('/authenticate', (req, res) => {
  //find the user
  User.findOne({name: req.body.name}, (err, user) => {
    if(err) throw err;

    if(!user) {
      res.json({success: false, message: 'Authentication failed. User not found.'});
    } else if(user) {

      //check if password matches
      if(serverHelper.bcryptValidPassword(user.password, req.body.password)) {
        res.json({success: false, message: 'Authentication failed. Wrong password.'});      
      } else {
        // if user is found and password is right
        // create a token with only our given payload
        const payload = {
          admin: user.admin
        };
        let token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: "1 days"
        });
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    } 
  });
});

apiRoutes.get('/setup', (req, res) => {
  const user = new User({
    name: 'Yuchao Wu', 
    password: serverHelper.bcryptGenerateHash('password'),
    admin: true 
  });

  user.save((err) => {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// route middleware to verify a token
apiRoutes.use((req, res, next) => {
  
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if(err) {
        return res.json({success: false, message: 'Failed to authenticate token.', error: err});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

// route to return all users
apiRoutes.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

app.use('/api', apiRoutes);


// API ROUTES -------------------
// we'll get to these in a second

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
