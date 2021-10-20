//import Express from 'express';
//const router = Express().router;
import * as CQ from '../query/companyQuery.js';

export const signInUser = async (req, res, next) => {
    const companyForm = req.body;
    const CA = new Date();
    companyForm.PW = await hash(companyForm.PW);
    try {
        await Cp.insert({ companyForm, CA: CA });
        res.send(true);
    } catch (e) {
        console.error(e);
        res.send(false);
    }
};

export const idCheck = (req, res, next) => {
    const id = req.body.id;
    return CQ.findByID(id) == null;
};

export const CIDCheck = (req, res, next) => {
    const CID = req.body.CID;
    return CQ.findByCID(CID) == null;
};
