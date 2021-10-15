import apt from '../schemas/apt';

/**
 * Create
 */
export const insert = insertForm => {
    try {
        return apt.create(insertForm);
    } catch (e) {
        console.error(e);
        return e;
    }
};

/**
 * Read
 */
export const findOneByCID = CID => {
    try {
        return apt.findOne({ CID });
    } catch (e) {
        console.error(e);
        return e;
    }
};
export const findManyByCID = (CID, condition) => {
    try {
        return apt.find({ CID: CID, condition }); //Condtion == 조건검색시.
    } catch (e) {
        console.error(e);
        return e;
    }
};

/**
 * Update
 */
export const updateByCID = (CID, updateForm) => {
    try {
        return apt.findByIdAndUpdate({ CID }, { updateForm }, { new: true });
    } catch (e) {
        console.error(e);
        return e;
    }
};

/**
 * Delete
 */
export const deleteByCID = (CID, condition) => {
    //삭제시 조건 설정 가능.
    try {
        return apt.findByIdAndDelete({ CID, condition });
    } catch (e) {
        console.error(e);
        return e;
    }
};
