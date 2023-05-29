const generateRandomCode = (length) => {
    let code = "BUS-";
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};

module.exports = generateRandomCode;
