import bcrypt from 'bcrypt';

//Encoding With Bcrypt.hash
export const encodeHash = str => {
    return bcrypt.hash(str);
};

//Boolean
export const hashedMatch = (str, hashedStr) => {
    return bcrypt.compareSync(str, hashedStr);
};
