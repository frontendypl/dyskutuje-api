require('dotenv').config();
const express = require('express')

const Topic = require('../models/Topic')
const Comment = require('../models/Comment')
const PrintScreen = require('../models/PrintScreen')

const topicProtocol = require('../utils/index').topicProtocol
const createPrintScreen = require('../utils/index').createPrintScreen

const router = new express.Router()

router.post('/topics',async (req, res)=>{

    const url = req.body.url
    console.log(url)

    const errors = {}

    const topicExist = await Topic.findOne({url: topicProtocol(url)})

    if(topicExist?._id){
        return res.status(200).send(topicExist)
    }

    const topic = new Topic({url})

    try {
        const newTopic = await topic.save()        
        createPrintScreen(newTopic,newTopic.url)
        res.status(201).send(newTopic)
    }catch (e) {

        // errors.test = {
        //     message: 'Testowy błąd'
        // }

        res.status(400).send({
            ...errors,
            ...e.errors
        })
    }

})

router.get('/topics', async (req, res)=>{
    const topics = await Topic.find().sort({'createdAt':-1})
    res.status(200).send(topics)
})

router.get('/topics/:id', async (req, res)=>{

    const data = {
        topic: {},
        comments: [],
    }

    try{
        data.topic  = await Topic.findById(req.params.id)
        data.comments = await Comment.find({topic: data.topic}).sort({'createdAt':-1})
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;