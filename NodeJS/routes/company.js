//import { create, findById as _findById } from '../schemas/company';
import { hash } from 'bcrypt';
import { Company as Cp } from '../query/companyQuery';

router.post('/company', async (req, res, next) => {
    const companyForm = req.body;
    const CA = new Date();
    let msg = 'Success';

    companyForm.PW = await hash(companyForm.PW);

    try {
        await Cp.insert({ companyForm, CA: CA });
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
        if (Cp.findById(id) == !null) {
            boolUsing = false;
        }
        res.status(200).json({ boolUsing });
    } catch (e) {
        console.error(e);
    }
});
