import bcrypt from 'bcrypt-nodejs';

export const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
export const validPassword = function (password,hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
};

const bcryptCode = {
    generateHash,
    validPassword
}

export default bcryptCode