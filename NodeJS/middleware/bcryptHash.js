import bcrypt from 'bcrypt';

//Encoding With Bcrypt.hash
const encodeHash = str => {
    return bcrypt.hash(str);
};

//Boolean
const hashedMatch = (str, hashedStr) => {
    return bcrypt.compareSync(str, hashedStr);
};
