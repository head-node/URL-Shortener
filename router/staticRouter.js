const express = require('express');
const URL = require('../models/url');
const { handleURLStoRender, redirectToSignup, redirectToLogin } = require('../controllers/staticpage');


const router = express.Router();

router.get('/', handleURLStoRender);

router.get('/signup', redirectToSignup);

router.get('/login', redirectToLogin);

module.exports = router;