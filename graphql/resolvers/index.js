const postsResvolers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

// do some logic and then returns the result of the query (resolvers)
module.exports = {
    Query: {
        ...postsResvolers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResvolers.Mutation,
        ...commentsResolvers.Mutation,

    }
};