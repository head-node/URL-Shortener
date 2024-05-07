const {v4: uuidv4} = require('uuid');
const User = require('../models/user');
const { setUser } = require('../Utils/auth');
const handleUserSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await User.create({
            name,
            email,
            password
        });
        return res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email, password
        });
        if(!user) return res.render('login', {
            error: "Invalid email or password"
        });  
        const token = setUser(user);
        if(token)
        res.cookie('uid', token);
        return res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}