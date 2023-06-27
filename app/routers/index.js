const express = require('express');

const router = express.Router();

const apiRouter = require('./API');

router.use('/api', apiRouter);

module.exports = router;
