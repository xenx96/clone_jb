import { findOne, findOneAndDelete, create, findOneAndUpdate } from '../schemas/company';

export const findByID = id => {
    return findOne({ ID: id });
};

export const findByCID = CID => {
    return findOne({ CID });
};
//Form is JSON or Map.
export const updateByID = (id, updateForm) => {
    const UA = new Date.now();
    updateForm.UA = UA;
    try {
        return findOneAndUpdate({ ID: id }, { updateForm }, { new: true });
    } catch (e) {
        console.error(e);
        return e;
    }
};

export const deleteByID = id => {
    try {
        return findOneAndDelete({ ID: id });
    } catch (e) {
        console.error(e);
        return e;
    }
};
//
export const Insert = insertForm => {
    try {
        return create(insertForm);
    } catch (e) {
        console.error(e);
        return e;
    }
};
