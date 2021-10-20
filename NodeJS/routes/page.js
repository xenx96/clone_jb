import { Router } from 'express';
import { isLogginJWT, isNotLogginJWT } from '../middleware/auth.js';
import * as CP from '../query/companyQuery.js';
import * as hash from '../middleware/bcryptHash.js';
import * as auth from '../middleware/auth.js';
const router = Router();
/**
 * redirect와 Render를 주의해서 사용해주세요!
 *
 */

router.get('/', (req, res, next) => {
    res.redirect('index');
});
router.get('/index', (req, res, next) => {
    res.render('index', { text: 'Hello Friends!' });
});

router.get('/login/company', isNotLogginJWT, (req, res, next) => {
    res.render('/login');
});
router.post('/login/company', isNotLogginJWT, (req, res, next) => {
    const id = req.body.id;
    companyInfo = CP.findByID(id);
    if (hash.hashedMatch(req.body.pw, companyInfo.pw)) {
        const form = { id: companyInfo.id, CID: companyInfo.CID };

        auth.putInCookie(auth.makeJWT(form));
    } else {
        res.json(false);
    }
});

export default router;
