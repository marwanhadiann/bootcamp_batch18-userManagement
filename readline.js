const readline = require('readline')
const fs = require('fs')
const user = require('./user')
const { validateName, validateEmail, validateTelp, validateStatus } = require('./validator')

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

        if (!validateName(name, parsedUsers)) {
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
        if (!validateEmail(email)) {
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
        if (!validateTelp(telp)) {
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
        if (!validateStatus) {
            inputStatus(name, email, telp, role, parsedUsers)
            return
        }
        status = status === 'true'
        inputData(name, email, telp, role, status, parsedUsers)

    })
}

const inputData = (name, email, telp, role, status, parsedUsers) => {
    const newData = { name, email, telp, role, status }
    parsedUsers.push(newData)
    fs.writeFileSync('users.json', JSON.stringify(parsedUsers, null, 2))
    console.log('-'.repeat(30));
    console.log(`Nama       : ${name}`);
    console.log(`Email      : ${email}`);
    console.log(`No telp    : ${telp}`);
    console.log(`Role       : ${role}`);
    console.log(`Status     : ${status}`);
    console.log('User successfully created')
    rl.close();
}

inputName()

module.exports = rl