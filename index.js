const {ApolloServer} = require ('apollo-server');
const mongoose = require('mongoose'); // connect with database

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const { MONGODB } = require('./config.js'); // Mongoo DB connection string
// setup Apollo server
const server = new ApolloServer({
    typeDefs : typeDefs,
    resolvers: resolvers,
    context: ({ req }) => ({ req })
});

// connect with database
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });

