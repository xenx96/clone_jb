//import Express from 'express';
//const router = Express().router;
import * as hash from '../middleware/bcryptHash.js';
import * as CQ from '../query/companyQuery.js';

export const signInUser = async (req, res) => {
    const companyForm = req.body;
    try {
        var hashedPW = await hash.encodeHash(companyForm.PW);
        console.log(hashedPW);
        res.send(CQ.Insert(companyForm));
    } catch (e) {
        console.error(e);
        res.send(false);
    }
};

const msg = '사용 가능합니다.';

export const idCheck = async id => {
    if ((await CQ.findByID(id)) == null) {
        return msg;
    }
    throw '이미 사용중인 아이디입니다.';
};

export const CIDCheck = async CID => {
    if ((await CQ.findByCID(CID)) == null) {
        return msg;
    }
    throw '이미 사용중인 부동산 등록번호 입니다.';
};
