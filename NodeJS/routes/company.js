//import { create, findById as _findById } from '../schemas/company';
import { hash } from 'bcrypt';
import * as CQ from '../query/companyQuery';
import * as CS from '../service/CompanyService';

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
        if (CQ.findById(id) == !null) {
            boolUsing = false;
        }
        res.status(200).json({ boolUsing });
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;
