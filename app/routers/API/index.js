const express = require('express');

const { apiController } = require('../../controllers/API');
const adminRouter = require('./admin');
const oworldRouter = require('./oworld');
const userRouter = require('./user');
const logRouter = require('./log');

const Error404 = require('../../errors/Error404');
const apiErrorHandler = require('../../errors/apiErrorHandler');

const router = express.Router();

router.all('/', apiController.getHome);

router.use('/oworld', oworldRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/log', logRouter);

router.use((request, response, next) => {
  next(new Error404());
});

router.use((err, req, res, next) => {
  apiErrorHandler(err, req, res);
  next();
});

module.exports = router;
