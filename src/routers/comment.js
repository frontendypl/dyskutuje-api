require('dotenv').config();
const express = require('express')

const Comment = require('../models/Comment')

const router = new express.Router()

router.get('/comments', async (req, res)=>{
    const comments = await Comment.find().sort({'createdAt':-1})
    res.status(200).send(comments)
})

router.post('/comments',async (req, res)=>{

    const text = req.body.text
    const nickName = req.body.nickName
    const topic = req.body.topic
    const parent = req.body.parent

    const errors = {}

    const comment = new Comment({
        topic,
        text,
        nickName,
        parent
    })

    try {
        const newComment = await comment.save()
        res.status(201).send(newComment)
    }catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

// router.delete('/comments/all', async (req, res)=>{
//     await Comment.deleteMany()
//     res.status(200).send('deleted all')
//   })

module.exports = router;