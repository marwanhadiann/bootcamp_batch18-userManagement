const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Name: ', (name) => {
    const data = fs.readFileSync('users.json', 'utf-8')
    const parsedUsers = JSON.parse(data)
    const nameDouble = parsedUsers.some((user) => {
        user.name = user.name.toLowerCase()
        return user.name === name
    })
    if (nameDouble) {
        console.log('-'.repeat(30))
        console.log('User already exist')
        console.log('-'.repeat(30))
        rl.close()
        return
    }
    rl.question('Email: ', (email) => {
        rl.question('No telp: ', (telp) => {
            rl.question('Role: ', (role) => {
                rl.question('Status(true/false): ', (status) => {
                    status = status === 'true'

                    const newData = { name, email, telp, role, status }
                    parsedUsers.push(newData)
                    fs.writeFileSync('users.json', JSON.stringify(parsedUsers, null, 2))
                    console.log('-'.repeat(30));
                    console.log(`Nama : ${name}`);
                    console.log(`Email : ${email}`);
                    console.log(`No telp : ${telp}`);
                    console.log(`Role : ${role}`);
                    console.log(`Status : ${status}`);
                    console.log('User successfully created')
                    rl.close();
                })
            })
        })
    })
})

module.exports = rl