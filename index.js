const {ApolloServer} = require ('apollo-server');
const gql = require ('graphql-tag');
const mongoose = require('mongoose'); // connect with database

const Post = require('./models/Post');

//const { MONGODB } = require('./config.js'); // Mongoo DB connection string
const MONGODB = 'mongodb+srv://kandil:1234@cluster0.peybj.mongodb.net/merng?retryWrites=true&w=majority'; 
const typeDefs = gql `
        type Post{
            id: ID!,
            body: String!,
            createdAt: String!,
            username: String!,
        }
    type Query{# fetch all the posts from the DB
       getPosts: [Post] # returns array of posts and must to identify the type of the post
    }
`;
// do some logic and then returns the result of the query (resolvers)
const resolvers = {
    Query: {
        // execute the query with this function
        async getPosts(){
            try{
                const posts = await Post.find(); // .find() will fetch all the model
                return posts;
            }catch(e){
                throw new Error(e);
            }
        }
    }
}

// setup Apollo server
const server = new ApolloServer({
    typeDefs : typeDefs,
    resolvers: resolvers,
});

// connect with database
mongoose.connect(MONGODB, {useNewUrlParser: true })
    .then(()=>{
        console.log('MongoDB Connected')
        return server.listen({port:5000});
    })// start the Apollo Server
    .then((res) => {
        console.log(`server running at ${res.url}`)
    });

