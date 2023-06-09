require('dotenv').config();
const express = require('express')

const Comment = require('../models/Comment')


const router = new express.Router()

router.post('/comments',async (req, res)=>{

    const text = req.body.text
    const topic = req.body.topic

    const errors = {}

    const comment = new Comment({
        topic,
        text
    })

    try {
        const newComment = await comment.save()
        res.status(201).send(newComment)
    }catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

module.exports = router;