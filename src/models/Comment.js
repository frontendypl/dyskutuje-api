const mongoose = require('mongoose')
const validator = require('validator')

const commentSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Topic'
    },
    text: {
        type: mongoose.Schema.Types.String,
        trim: true,
        required: [true, 'To pole nie może być puste'],
        maxLength: [250, 'Maksymalnie 250 znaków'],
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
},{
    timestamps: true
})

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment