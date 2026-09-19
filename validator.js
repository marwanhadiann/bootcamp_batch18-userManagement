const validator = require('validator');
// const users = require('./user')
const fs = require('fs')


const validateEmail = function (valEmail) {
    if (!validator.isEmail(valEmail)) {
        return {
            isValid: false,
            message: 'Email tidak valid, masukkan email yg benar (cth : user@gmail.com)'
        }
    }
    return { isValid: true }
}

const validateTelp = function (valTelp) {
    if (!validator.isMobilePhone(valTelp, 'id-ID')) {
        return {
            isValid: false,
            message: 'No Telp tidak valid, masukkan No Telp yang benar (cth : 08123456789)'
        }
    }
    return { isValid: true }
}

// const validateStatus = function (valStatus) {
//     if (valStatus != true && valStatus != false) {
//         return {
//             isValid: false,
//             message: 'Status tidak valid'
//         }
//     }
//     return { isValid: true }
// }


module.exports = { validateEmail, validateTelp }