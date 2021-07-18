const {model, Schema} = require('mongoose');

const postSchema = new Schema({
    body: String, 
    username: String,
    createdAt: String,
    comments: [// array of comments
        {
            body: String,
            username: String, 
            createdAt: String,
        }
    ], 
    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    // realtions between models (link models)
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

// export post model with the name of the model and the it's own schema
module.exports = model('Post', postSchema);