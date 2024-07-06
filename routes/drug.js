const express = require('express');
const drugRouter = express.Router();
const {
  getDrugs,
  postDrug,
  deleteDrug,
  getDrug,
  updateDrug,
} = require('../controllers/drug.js');
const ensureAuthenticated = require('../middleware/ensureAuthenticated.js');

drugRouter.get('/', ensureAuthenticated, getDrugs);
drugRouter.get('/:id', ensureAuthenticated, getDrug);
drugRouter.post('/create', ensureAuthenticated, postDrug);
drugRouter.post('/edit/:id', ensureAuthenticated, updateDrug);
drugRouter.post('/delete/:id', ensureAuthenticated, deleteDrug);

module.exports = drugRouter;
