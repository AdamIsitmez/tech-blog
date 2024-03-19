const router = require('express').Router()
const { User } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const existingUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.email } })

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' })
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (error) {
        res.status(400).json(error);
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/username/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        const username = userData.get({ plain: true }).username

        res.json(username)
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;