const router = require('express').Router();
const authService = require('../services/authService');
const isAuthenticated = require('../middlewares/isAuthenticated');
const errorCompiler = require('../controllers/helpers/errorCompiler')
const { COOKIE_NAME } = require('../config');

router.get('/login', (req, res) => {
    res.render('./guests/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let token = await authService.login({ username, password });
        res.cookie(COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        const errors = errorCompiler(error);
        res.render('./guests/login', { errors })
    }
});

router.get('/register', (req, res) => {
    res.render('./guests/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    console.log(repeatPassword, password)
    try {
        if (password !== repeatPassword) {
            throw new Error('Passwords missmatch!');
        }
        let user = await authService.register({ username, password });
        let token = await authService.login({ username, password });
        res.cookie(COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        const errors = errorCompiler(error);
        res.render('./guests/register', { errors })
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;
