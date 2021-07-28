const { AuthenticationError, UserInputError } = require('apollo-server');
const { argsToArgsConfig } = require('graphql/type/definition');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      } 
    },
    async getPost(_, {postId}){
      try{
        const post = await Post.findById(postId);
        if(post){
          return post;
        }else {
          throw new Error('Post not found')
        }
      }catch(e){
        throw new Error(e);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context){
      const user = checkAuth(context);
      console.log(user);
      // check if the body is empty
      if (args.body.trim() == ''){
        throw new Error('Post body must be not empty');
      }
      // proceed with the user actions after authentication
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context){
      const user = checkAuth(context);
      try{
        const post = await Post.findById(postId);
        // check the owner of the post
        if(user.username === post.username){
          await post.delete();
          return 'Post deleted successfully';
        }else {
          throw new AuthenticationError('Action not allowed');
        }
      }catch(e){
        throw new Error(e);
      }
    },
    async likePost(_, { postId }, context){
      
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if(post){
        // check if the user already liked the post
        if (post.likes.find(like => like.username == username)){
          // unlike the post
          post.likes = post.likes.filter(like => like.username !== username);
        }else {
          // not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),

          })
        }
        await post.save();
        return post;
      }else throw new UserInputError('Post Not Found')

    }
  }
};
