const Company = require('../schemas/company');

class Company {
    findBy_id = id => {
        return Company.findById(id);
    };
    findByCID = CID => {
        return Company.findOne({ CID });
    };
    //Form is JSON or Map.
    updateBy_id = (ID, updateForm) => {
        try {
            Company.findByIdAndUpdate(ID, { $push: updateForm });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    deleteBy_id = ID => {
        try {
            Company.findByIdAndDelete(ID);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };
    //
    Insert = insertForm => {
        try {
            Company.create(insertForm);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };
}
module.exports = Company;
