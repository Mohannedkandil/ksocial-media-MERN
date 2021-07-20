const postsResvolers = require('./posts');
const usersResolvers = require('./users');

// do some logic and then returns the result of the query (resolvers)
module.exports = {
    Query: {
        ...postsResvolers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
    }
};