require('dotenv').config();
const express = require('express')

const SubComment = require('../models/SubComment')

const router = new express.Router()

router.post('/sub-comments',async (req, res)=>{

    const text = req.body.text
    const comment = req.body.comment

    const errors = {}

    const subComment = new SubComment({
        comment,
        text
    })

    try {
        const newSubComment = await subComment.save()
        res.status(201).send(newSubComment)
    }catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

module.exports = router;