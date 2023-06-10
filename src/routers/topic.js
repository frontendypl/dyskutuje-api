require('dotenv').config();
const express = require('express')

const Topic = require('../models/Topic')
const Comment = require('../models/Comment')

const topicProtocol = require('../utils/index').topicProtocol

const router = new express.Router()

router.post('/topics',async (req, res)=>{

    const url = req.body.url

    const errors = {}

    const topicExist = await Topic.findOne({url: topicProtocol(url)})

    if(topicExist?._id){
        return res.status(200).send(topicExist)
    }

    const topic = new Topic({url})

    try {
        const newTopic = await topic.save()
        res.status(201).send(newTopic)
    }catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

router.get('/topics', async (req, res)=>{
    const topics = await Topic.find()
    res.status(200).send(topics)
})

router.get('/topics/:id', async (req, res)=>{

    const data = {
        topic: '',
        comments: [],
    }

    try{
        data.topic  = await Topic.findById(req.params.id)
        data.comments = await Comment.find({topic: data.topic})
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router;