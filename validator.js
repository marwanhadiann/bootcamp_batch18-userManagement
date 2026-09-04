const validator = require('validator');

const email = 'marwan@gmail.com'

// if (validator.isEmail(email)) {
//     console.log('valid email')
// } else {
//     console.log('invalid email')
// }

// const telp = 'dsfjh'

// console.log(validator.isMobilePhone(telp))

const bole = 'f7345'

if (validator.isBoolean(bole)) {
    console.log('boolean valid')
} else {
    console.log('invalid')
}