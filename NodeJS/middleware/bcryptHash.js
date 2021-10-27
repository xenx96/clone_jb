import bcrypt from 'bcrypt';

const SALT_NUM = 12;
//Encoding With Bcrypt.hash
export const encodeHash = str => {
    return bcrypt.hash(str, SALT_NUM);
};

//Boolean
export const hashedMatch = (str, hashedStr) => {
    return bcrypt.compareSync(str, hashedStr);
};
