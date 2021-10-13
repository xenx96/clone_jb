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
        return Company.findByIdAndUpdate(ID, { $push: updateForm });
    };
    deleteBy_id = ID => {
        return Company.findByIdAndDelete(ID);
    };
    Insert = insertForm => {
        return Company.create(insertForm);
    };
}
module.exports = Company;
