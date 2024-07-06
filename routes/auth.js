const Router = require('express').Router;
const authRoute = Router();
const {
  signup,
  login,
  logout,
  getUser,
  profile,
  googleLogin,
  googleCallback,
  successLogin,
  updateUser,
} = require('../controllers/auth.js');
const ensureAuthenticated = require('../middleware/ensureAuthenticated.js');

authRoute.post('/signup', signup);
authRoute.post('/signin', login);
authRoute.get('/logout', logout);
authRoute.get('/user', ensureAuthenticated, getUser);
authRoute.get('/profile', ensureAuthenticated, profile);
authRoute.post('/update', ensureAuthenticated, updateUser);
authRoute.get('/google', googleLogin);
authRoute.get('/google/callback', googleCallback);
authRoute.get('/login/success', successLogin);

module.exports = authRoute;
