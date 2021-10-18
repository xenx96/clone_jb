import jwt from 'jsonwebtoken';
import session from 'express-session';
import * as SQ from '../query/sessionQuery';
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
export const loginValidate = async AT => {
    const COMP_FOR_TIME = 0; //유효성 시간
    const loginInfo = await SQ.find(AT); // Access Token으로 로그인 정보 불러오기
    let timeComp = (await timeComparison(loginInfo.CA, loginInfo.LC)) >= COMP_FOR_TIME; //로그인 시간 비교
    timeComp ? SQ.deleteByAT(AT) : SQ.updateLCbyAT(AT); //유효성 시간보다 오랫동안 Update, 즉 활동 하지 않았을경우 세션삭제.
    return timeComp ? true : false;
};

export const isNotLogginSS = async (req, res, next) => {
    const AT = req.cookies.AT;
    const Bool = (await SQ.find(AT)) ? loginValidate(AT) : res.redirect('/login');
    Bool ? next() : res.redirect('/login');
};

export const isLogginSS = async (req, res, next) => {
    const AT = req.cookies.AT;
    return SQ.find(AT) ? res.redirect('/') : next();
};

const timeComparison = async (CA, LC) => {
    return LC ? Date.now - LC : Date.now - CA;
};
