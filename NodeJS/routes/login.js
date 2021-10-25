import { Router } from 'express';
import { isLogginJWT, isNotLogginJWT } from '../middleware/auth.js';
import * as CP from '../query/companyQuery.js';
import * as hash from '../middleware/bcryptHash.js';
import * as auth from '../middleware/auth.js';
const router = Router();

router.get('/company', isNotLogginJWT, (req, res, next) => {
    res.render('/login');
});

router.post('/company', isNotLogginJWT, (req, res, next) => {
    const id = req.body.id;
    console.log(req.body);
    companyInfo = CP.findByID(id);
    if (hash.hashedMatch(req.body.pw, companyInfo.pw)) {
        const form = { id: companyInfo.id, CID: companyInfo.CID };
        auth.putInCookie(auth.makeJWT(form));
    } else {
        res.json(false);
    }
});

export default router;
