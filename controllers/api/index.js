const router = require('express').Router();
const userRoutes = require('./user-routes');
const tradeRoutes = require('./trade-routes');

router.use('/users', userRoutes);
router.use('/trades', tradeRoutes);

module.exports = router;
