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

export default router;
