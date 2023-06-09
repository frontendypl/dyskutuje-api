const mongoose = require('mongoose')
const validator = require('validator')

const topicProtocol = require('../utils/index').topicProtocol

const topicSchema = new mongoose.Schema({
    url: {
        type: mongoose.Schema.Types.String,
        trim: true,
        required: [true, 'To pole nie może być puste'],
        unique: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Niepoprawny adres strony')
            }
        }
    }
},{
    timestamps: true
})

topicSchema.pre('save', async function(next){
    const topic = this
    topic.url = topicProtocol(topic.url)

    next()
})

const Topic = mongoose.model('Topic', topicSchema)
module.exports = Topic