const validator = require('validator');
// const users = require('./user')
const fs = require('fs')

const validateName = function (valName) {
    const data = fs.readFileSync('users.json', 'utf-8')
    const parsedUsers = JSON.parse(data)
    const nameExist = parsedUsers.some((user) => user.name.toLowerCase() === valName.trim().toLowerCase())
    if (nameExist) {
        // console.log('-'.repeat(30))
        // console.log('User already exist')
        // console.log('-'.repeat(30))
        return {
            isValid: false,
            message: 'Nama sudah digunakan'
        }
    }
    return { isValid: true }

}

const validateEmail = function (valEmail) {
    if (!validator.isEmail(valEmail)) {
        // console.log('-'.repeat(30))
        // console.log('Email tidak valid, masukkan email yg benar (cth : user@gmail.com)');
        return {
            isValid: false,
            message: 'Email tidak valid, masukkan email yg benar (cth : user@gmail.com)'
        }
    }
    return { isValid: true }
}

const validateTelp = function (valTelp) {
    if (!validator.isMobilePhone(valTelp, 'id-ID')) {
        // console.log('-'.repeat(30))
        // console.log('No Telp tidak valid, masukkan No Telp yang benar (cth : 08123456789)')
        return {
            isValid: false,
            message: 'No Telp tidak valid, masukkan No Telp yang benar (cth : 08123456789)'
        }
    }
    return { isValid: true }
}

const validateStatus = function (valStatus) {
    // const isStatus = valStatus.toLowerCase()
    if (valStatus != true && valStatus != false) {
        console.log('-'.repeat(30))
        console.log('Status tidak valid, masukkan true/false')
        return false
    }
    return true
}


module.exports = { validateName, validateEmail, validateTelp, validateStatus }