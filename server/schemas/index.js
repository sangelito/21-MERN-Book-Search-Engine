// const router = require('express').Router();
// const userRoutes = require('./user-routes');

// router.use('/users', userRoutes);

// module.exports = router;

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { resolvers, typeDefs };