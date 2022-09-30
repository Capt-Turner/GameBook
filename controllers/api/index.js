const router = require('express').Router();
const axios = require('axios').default;
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;