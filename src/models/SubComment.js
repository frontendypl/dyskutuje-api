const mongoose = require('mongoose')
const validator = require('validator')

const subCommentSchema = new mongoose.Schema({
    text: {
        type: mongoose.Schema.Types.String,
        trim: true,
        required: [true, 'To pole nie może być puste'],
        maxLength: [250, 'Maksymalnie 250 znaków'],
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Comment'
    },
},{
    timestamps: true
})

const SubComment = mongoose.model('SubComment',subCommentSchema)

module.exports = SubComment