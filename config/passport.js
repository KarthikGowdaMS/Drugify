//encrypts Oauth keys
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20');

//middleware to encrypt passwords
const bCrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

const keys = require('../keys.js');
var { ObjectId } = require('mongodb');
const User = require('../db').collection('Users');
// const otp=require('../models/otp.js');

// Passport session setup
passport.serializeUser(function (user, done) {
  // console.log('user', user, 'done', done);
  if (user) {
    console.log('serialize' + user._id);
    done(null, user._id);
  } else {
    console.log('serialize' + user._id);
    done(null, user._id);
  }
});

// used to deserialize the user
passport.deserializeUser(async function (id, done) {
  // console.log('deserialize' + id);

  //   console.log(id);
  const user = await User.findOne(new ObjectId(id));
  if (user) {
    console.log('deserialize', user);
    done(null, user);
  } else {
    done(null, null);
  }
});

//passport config for local signup
passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      process.nextTick(async function () {
        const user = await User.findOne({
          username: username,
        });

        if (user) {
          // console.log('signupMessage', 'That email is already taken.');

          return done(null, false, {
            message: 'That email is already taken.',
          });
        } else {
          const userPassword = generateHash(req.body.password);
          const newUser = {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: userPassword,
            age: req.body.age,
            mobile: req.body.mobile,
            authMethod: 'local',
          };

          const result = await User.insertOne(newUser);
          if (result.insertedCount === 0) {
            return done(null, false);
          } else {
            const dbUser = await User.findOne({ _id: result.insertedId });
            // sendotpemail(dbUser.username, dbUser._id);
            return done(null, dbUser);
          }
        }
      });
    }
  )
);

passport.use(
  'local-signin',
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username: username });
      const isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      };

      if (!user) {
        return done(null, false, { message: 'User does not exist.' });
      }
      // console.log('user', user);

      if (!isValidPassword(user.password, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(null, false, {
        message: 'Something went wrong with your Signin.',
      });
    }
  })
);

//passport config for google signin
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      callbackURL: '/api/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      //   console.log("Email: " + profile.emails[0].value);
      //   console.log("ID: " + profile.id);
      //   console.log("Display name: " + profile.displayName);
      //   console.log("given name: " + profile.name.givenName);
      //   console.log("google passport callback");

      //done(null, { id: profile.id });
      process.nextTick(async function () {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          //   let Iduser = await User.findOne({ socialID: profile.id });

          if (!user.socialID) {
            const dbUser = await User.findOneAndUpdate(
              { authMethod: 'google' },
              { socialID: profile.id }
            );
            console.log(dbUser);

            if (!dbUser) {
              return done(null, false);
            } else {
              console.log(dbUser.dataValues);
              return done(null, dbUser);
            }
          } else {
            console.log('Already signed in.');
            return done(null, user);
          }
        } else {
          const dbUser = await User.insertOne({
            name: profile.displayName,
            email: profile.emails[0].value,
            authMethod: 'google',
            socialID: profile.id,
          });

          if (dbUser) {
            user = await User.findOne({ email: profile.emails[0].value });
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      });
    }
  )
);

//generate hash for password
function generateHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}
