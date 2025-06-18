const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash; // Return the hashed password
    } catch (error) {
        console.error("Error encrypting password:", error);
        throw error;
    }
};

const comparePassword = async (password, hash) => {
    try {
        const match = await bcrypt.compare(password, hash);
        return match; // Return true if passwords match, false otherwise
    } catch (error) {
        console.error("Error comparing password:", error);
        throw error;
    }
}
module.exports = {
    encryptPassword,
    comparePassword
};
