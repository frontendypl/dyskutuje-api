const mongoose = require('mongoose')

const printScreenSchema = new mongoose.Schema({
    src: {
        type: mongoose.Schema.Types.String,
        trim: true,
        required: true
    },
    title: {
        type: mongoose.Schema.Types.String,
        trim: true,
        // required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    }
})

const PrintScreen = mongoose.model('PrintScreen',printScreenSchema)

module.exports = PrintScreen