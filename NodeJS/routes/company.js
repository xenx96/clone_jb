import * as CS from '../service/CompanyService.js';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.json({ ID: 'dfdf' });
});

router.post('/', CS.signInUser);
/**
 * Company ID 중복 조회 메서드..
 */

router.get('/id', (req, res, next) => {
    const id = req.body.id;
    try {
        res.json(CS.idCheck(id));
    } catch (e) {
        console.error(e);
        res.json(e);
    }
});

router.get('/cid', (req, res, next) => {
    const cid = req.body.cid;
    try {
        res.json(CS.CIDCheck(cid));
    } catch (e) {
        console.error(e);
        res.json(e);
    }
});

export default router;
