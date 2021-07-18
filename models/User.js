const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdA: String
})
// export the model with model name and the reference to the Schema
module.export = model('User', userSchema);