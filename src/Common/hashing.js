module.exports = {
    enc : (str) => {
        const sha256 = require('sha256');
        
        return sha256(str);
    },
}