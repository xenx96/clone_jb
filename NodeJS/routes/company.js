//import { create, findById as _findById } from '../schemas/company';
import * as hash from '../middleware/bcryptHash.js';
import * as CQ from '../query/companyQuery.js';
import * as CS from '../service/CompanyService.js';
import express from 'express';
const router = express.Router();

router.post('/company', CS.signInUser, async (req, res, next) => {
    res.send(msg);
});
/**
 * Company ID 중복 조회 메서드.
 */

router.get('/company/id', (req, res, next) => {
    const id = req.body.id;
    let boolUsing = true;
    try {
        if (CQ.findByID(id) == !null) {
            boolUsing = false;
        }
        res.status(200).json({ boolUsing });
    } catch (e) {
        console.error(e);
    }
});

export default router;
