import jwt from 'jsonwebtoken';
import session from 'express-session';
/**
 * For Login or Check, With JWT
 */
const makeJWT = formJson => {
    return jwt.sign(formJson, secretObj.secret, { expireIn: '30m' }); //formJSon Type is JSONObject.
};

const putInCookie = (req, res, token) => {
    res.cookie('token', token);
};

const expiredJWT = (req, res) => {
    res.cookie('token', req.cookies, { expireIn: 0 });
};

const veryFided = token => {
    return jwt.verify(token, secretObj.secret);
};

//if user's status is loggined, callback to /index or /main page.
//Cannot go in /login or /join page.
const isLogginJWT = (req, res, next) => {
    try {
        veryFided(req.cookies.token);
        res.redirect('/');
    } catch (e) {
        next();
    }
};

//If user's status isn't loggined, callback to /login or /main.
//Cannot use any function like; create,put or delete
const isNotLogginJWT = (req, res, next) => {
    try {
        veryFided(req.cookies.token);
        next();
    } catch (e) {
        res.redirect('/login');
    }
};

/**
 * For Login or Check With Session.
 */
