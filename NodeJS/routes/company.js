const Company = require('../schemas/company');
const bcrypt = require('bcrypt');
const { findById } = require('../query/companyQuery');

router.post('/company', async (req, res, next) => {
    const companyForm = req.body;
    const CA = new Date();
    let msg = 'Success';

    companyForm.PW = await bcrypt.hash(companyForm.PW);

    try {
        await Company.create({ companyForm, CA: CA });
    } catch (e) {
        msg = 'Failed';
        console.error(e);
    }
    res.send(msg);
});
/**
 * Company ID 중복 조회 메서드.
 */

router.get('/company/id', (req, res, next) => {
    const id = req.body.id;
    let boolUsing = true;
    try {
        if (Company.findById(id) == !null) {
            boolUsing = false;
        }
        res.json({ boolUsing });
    } catch (e) {
        console.error(e);
    }
});
