const router = require('express').Router()
const { Post } = require('../../models')

router.put('/:id', async (req, res) => {
    try {
        const userData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(userData)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const userData = await Post.create(req.body);

        res.status(200).json(userData)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;
