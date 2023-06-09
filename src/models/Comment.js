const mongoose = require('mongoose')
const validator = require('validator')

const commentSchema = new mongoose.Schema({
    text: {
        type: mongoose.Schema.Types.String,
        trim: true,
        required: [true, 'To pole nie może być puste'],
        maxLength: [250, 'Maksymalnie 250 znaków'],
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Topic'
    },
},{
    timestamps: true
})

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment