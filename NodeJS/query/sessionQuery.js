import * as SS from '../schemas/sessiondb.js';

export const find = data => {
    try {
        return SS.sessiondb.find({ data });
    } catch (e) {
        console.error(e);
        return e;
    }
};

export const insert = insertForm => {
    const CA = Date.now();
    insertForm.CA = CA;
    try {
        return SS.create(insertForm);
    } catch (e) {
        console.error(e);
        return e;
    }
};
export const deleteByAT = AT => {
    try {
        return SS.findOneAndDelete({ AT: AT });
    } catch (e) {
        console.error(e);
        return e;
    }
};
export const updateLCbyAT = AT => {
    const LC = Date.now();
    try {
        return SS.findOneAndUpdate({ AT: AT }, { LC: LC });
    } catch (e) {
        console.error(e);
        return e;
    }
};
