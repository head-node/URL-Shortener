const URL = require("../models/url");

const handleURLStoRender = async (req, res) => {
    const { user } = req;
    // we are checking if the user is logged in or not
    // if the user is not logged in, we are redirecting the user to the login page
    // if the user is logged in, we are fetching all the urls created by the user
    // and rendering the home page with all the urls
    // this is how we are restricting the user to access the home page without logging in/ signing up
    // *********IMPORTANT**********
    // we are redirecting to the login page if the user is not logged in if we dont need to pass any data to the login page, else we will render the login page with the data
    if (!user) return res.redirect('/login');
    const allUrls = await URL.find({ createdBy: user._id });
    res.render('home', { urls: allUrls });
}

const redirectToSignup = (req, res) => {
    return res.render('signup');
}

const redirectToLogin = (req, res) => {
    return res.render('login');
}

module.exports = {
    handleURLStoRender,
    redirectToSignup,
    redirectToLogin
}   