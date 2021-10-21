//import { create, findById as _findById } from '../schemas/company';
import * as hash from '../middleware/bcryptHash.js';
import * as CQ from '../query/companyQuery.js';
import * as CS from '../service/CompanyService.js';
import express from 'express';
import company from '../schemas/company.js';
const router = express.Router();

router.post('/company', CS.signInUser, async (req, res, next) => {
    res.send(msg);
});
/**
 * Company ID 중복 조회 메서드..
 */

router.get('/company/id', (req, res, next) => {
    const id = req.body.id;
    try {
        res.json(CS.idCheck(id));
    } catch (e) {
        console.error(e);
        res.json(e);
    }
});

router.get('/company/cid', (req, res, next) => {
    const cid = req.body.cid;
    try {
        res.json(CS.CIDCheck(cid));
    } catch (e) {
        console.error(e);
        res.json(e);
    }
});

export default router;
