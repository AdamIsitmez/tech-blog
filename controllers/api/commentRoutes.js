const router = require('express').Router()
const { Comment } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const userData = Comment.create(req.body);

        res.status(200).json(userData)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;