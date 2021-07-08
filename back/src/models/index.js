const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('User', schema)