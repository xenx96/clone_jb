import * as company from '../schemas/company.js';
const CP = company.model;

export const findByID = id => {
    return CP.findOne({ ID: id });
};

export const findByCID = CID => {
    return CP.findOne({ CID });
};
//Form is JSON or Map.
export const updateByID = (id, updateForm) => {
    const UA = new Date.now();
    updateForm.UA = UA;
    try {
        return CP.findOneAndUpdate({ ID: id }, { updateForm }, { new: true });
    } catch (e) {
        console.error(e);
        return e;
    }
};

export const deleteByID = id => {
    try {
        return CP.findOneAndDelete({ ID: id });
    } catch (e) {
        console.error(e);
        return e;
    }
};
//
export const Insert = insertForm => {
    try {
        return CP.create(insertForm);
    } catch (e) {
        console.error(e);
        return e;
    }
};
