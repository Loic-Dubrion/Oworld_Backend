const express = require('express');

// Controllers
const { apiController } = require('../../controllers/API');

// Routers
const adminRouter = require('./admin');
const oworldRouter = require('./oworld');
const userRouter = require('./user');
const logRouter = require('./log');

// Middlewares
const Error404 = require('../../errors/Error404');
const apiErrorHandler = require('../../errors/apiErrorHandler');

const router = express.Router();

// Documentation
router.all('/', apiController.getHome);

router.use('/oworld', oworldRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/log', logRouter);

// End of the road... Error 404
router.use((request, response, next) => {
  next(new Error404());
});

// Error management
router.use((err, req, res, next) => {
  apiErrorHandler(err, req, res);
  next();
});

module.exports = router;
