const express = require('express');

const adminRouter = require('./admin');
const visitorRouter = require('./visitor');
const userRouter = require('./user');
const accountRouter = require('./account');

const Error404 = require('../../errors/Error404');
const apiErrorHandler = require('../../errors/apiErrorHandler');

const router = express.Router();

router.use('/oworld', visitorRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/account', accountRouter);

router.use((request, response, next) => {
  next(new Error404());
});

router.use((err, req, res, next) => {
  apiErrorHandler(err, req, res);
  next();
});

module.exports = router;
