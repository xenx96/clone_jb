import * as SS from '../schemas/sessiondb';

export const findByLID = LID => {
    try {
        return SS.sessiondb.find({ LID });
    } catch (e) {
        console.error(e);
        return e;
    }
};

export const insert = insertForm => {
    try {
        return SS.create;
    } catch (e) {}
};
