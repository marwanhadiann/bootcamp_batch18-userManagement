const readline = require('readline')
const fs = require('fs')
const validator = require('validator');
const user = require('./user')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (!fs.existsSync('users.json')) {
    fs.writeFileSync('users.json', JSON.stringify(user, null, 2))
}

// input name
// --------------------
const inputName = () => {
    rl.question('Name: ', (name) => {
        const data = fs.readFileSync('users.json', 'utf-8')
        const parsedUsers = JSON.parse(data)
        const nameDouble = parsedUsers.some((user) => {
            user.name
            return user.name.toLowerCase() === name.toLowerCase()
        })
        if (nameDouble) {
            console.log('-'.repeat(30))
            console.log('User already exist')
            console.log('-'.repeat(30))
            inputName()
            return
        }
        inputEmail(name, parsedUsers)
    })
}

// input email
// --------------------
const inputEmail = (name, parsedUsers) => {
    rl.question('Email: ', (email) => {

        if (!validator.isEmail(email)) {
            console.log('-'.repeat(30))
            console.log('Email tidak valid, masukkan email yg benar (cth : user@gmail.com)');
            inputEmail(name, parsedUsers)
            return
        }
        inputTelp(name, email, parsedUsers)
    })
}

// input No Telp
// --------------------
const inputTelp = (name, email, parsedUsers) => {
    rl.question('No telp: ', (telp) => {

        if (!validator.isMobilePhone(telp, 'id-ID')) {
            console.log('-'.repeat(30))
            console.log('No Telp tidak valid, masukkan No Telp yang benar (cth : 08123456789)')
            inputTelp(name, email, parsedUsers)
            return
        }
        inputRole(name, email, telp, parsedUsers)
    })
}

// input Role
// --------------------
const inputRole = (name, email, telp, parsedUsers) => {
    rl.question('Role: ', (role) => {
        inputStatus(name, email, telp, role, parsedUsers)
    })
}

// input status
// --------------------
const inputStatus = (name, email, telp, role, parsedUsers) => {
    rl.question('Status(true/false): ', (status) => {
        const isStatus = status.trim().toLowerCase();
        if (isStatus != 'true' && isStatus != 'false') {
            console.log('-'.repeat(30))
            console.log('Status tidak valid, masukkan true/false')
            inputStatus(name, email, telp, role, parsedUsers)
            return
        }
        const statusBoolean = isStatus === 'true'


        const newData = { name, email, telp, role, statusBoolean }
        parsedUsers.push(newData)
        fs.writeFileSync('users.json', JSON.stringify(parsedUsers, null, 2))
        console.log('-'.repeat(30));
        console.log(`Nama       : ${name}`);
        console.log(`Email      : ${email}`);
        console.log(`No telp    : ${telp}`);
        console.log(`Role       : ${role}`);
        console.log(`Status     : ${statusBoolean}`);
        console.log('User successfully created')
        rl.close();

    })
}

inputName()

module.exports = rl