const router = require('express').Router();

// const dashboardRoutes = require('./dashboardRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

// router.use('/dashboard', dashboardRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);



module.exports = router;
