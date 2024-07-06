const resultRouter = require('express').Router();
const { getDrugDetails, searchHistory } = require('../controllers/search.js');
const ensureAuthenticated = require('../middleware/ensureAuthenticated.js');

resultRouter.get('/:drugName', ensureAuthenticated, getDrugDetails);
resultRouter.get('/history', ensureAuthenticated, searchHistory);

module.exports = resultRouter;
