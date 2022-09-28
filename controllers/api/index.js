const router = require('express').Router();
const userRouters = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;