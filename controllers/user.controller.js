const User = require('../models/user');
const config = require('../config');
const jwt = require('jsonwebtoken')

const login = (req, res) => {
    return User.login(req.body, (err, same, userData) => {
        if( err || !same) {
            err && console.log("error at user login,\n req.query : " + JSON.stringify(req.query) + "\n error : " + JSON.stringify(err));
            return res.send({ auth : false, message : "Login failed, Please check your credentials and try again"});
        } else {
            const { name, email } = userData.toJSON();
            return jwt.sign({ name , email }, config.jwtSecretKey, function(err, authToken) {
                return res.send({ auth : !(err), authToken, message : !!(err) ? "Error logging the user in" : "Logged in successfully.", userInfo : { name, email }});
            });
        }
    })
};

const signUp = (req, res) => {
    return User.signUp(req.body, (err, resp) => {
        return res.send({
            status : !Boolean(err),
            message : Boolean(err) ? "Error signing up with this email and password. Please check them and try later" : "Signed up successfully!!!"
        });
    })
};

try {
    User.storeLogin();
} catch (error) {
    // console.log(error)
}
const signUpOtp = () => {}
const signUpPassword = () => {}
const forgetPasswordEmail = () => {}
const forgetPasswordOtp = () => {}
const forgetPasswordPassword = () => {}

module.exports = { login, signUp, signUpOtp, signUpPassword, forgetPasswordEmail, forgetPasswordOtp, forgetPasswordPassword }