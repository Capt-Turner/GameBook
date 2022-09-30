const router = require('express').Router();
<<<<<<< HEAD
=======
const axios = require('axios').default;
>>>>>>> 05bf73b8b2591a780b25c838e5aa89812916181a
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;