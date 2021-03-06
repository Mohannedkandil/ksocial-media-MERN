const {UserInputError} = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation : {
        createComment : async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            // validation: check for empty comments
            if(body.trim() === ''){
                throw new UserInputError('Empty Comment', {
                    errors: {
                        body: 'Comment must be not empty'
                    }
                })
            }
            const post = await Post.findById(postId);
            

            if (post){
                // add new items to the begging of the array
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                }); 
                await post.save();
                return post;
            }else throw new UserInputError('Post not found'); 
        }
    }
}