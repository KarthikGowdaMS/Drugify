const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db.js');
const cookieParser = require('cookie-parser');
const flash = require('express-flash-messages');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const passportSetup = require('./config/passport');

const authRoute = require('./routes/auth.js');
const drugRoute = require('./routes/drug.js');
const resultRoute = require('./routes/search.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    // name: 'session-id',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      expires: 2592000000,
      httpOnly: false,
    },
  })
);

app.use(cookieParser());
app.use(flash());

mongoose.Promise = Promise;
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    // origin: 'http://localhost:3000',
    origin: 'https://drugify.karthikgowdams.com',
    // origin:"http://192.168.163.141:3000", // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use((req, res, next) => {
  // access-control-allow-origin http://localhost:3000
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Origin', 'https://drugify.karthikgowdams.com');
  // res.header('Access-Control-Allow-Origin', 'http://192.168.163.141:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api/auth', authRoute);
app.use('/api/drug', drugRoute);
app.use('/api/search', resultRoute);

app.get('/', async (req, res) => {
  res.send('welcome');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
