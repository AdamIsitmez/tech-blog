const router = require('express').Router();
const withAuth = require('../utils/auth')
const { Post, User, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ]
                }
            ]
        });

        posts = postData.map((post) => post.get({ plain: true }));

        posts.forEach(post => {
            post.logged_in = req.session.logged_in;
            post.currentUser = req.session.user_id;
        });

        const logged_in = req.session.logged_in;

        res.render('homepage', {
            posts, logged_in
        });


    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }

    res.render('login');
})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        })

        const userData = await User.findByPk(req.session.user_id);

        const posts = postData.map(post => post.get({ plain: true }));
        const user = userData.get({ plain: true });

        currentUser = req.session.user_id;
        logged_in = req.session.logged_in;

        res.render('dashboard', { posts, user, logged_in, currentUser });

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;



