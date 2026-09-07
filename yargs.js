const { demandOption } = require('yargs');
const yargs = require('yargs/yargs');
const fs = require('fs')
const { hideBin } = require('yargs/helpers');
const user = require('./user');
const { validateName, validateEmail, validateTelp, validateStatus } = require('./validator')
const validator = require('validator')

if (!fs.existsSync('users.json')) {
    fs.writeFileSync('users.json', JSON.stringify(user, null, 2))
}

const argv = yargs(hideBin(process.argv))
    .command('add', 'Add a new user', {
        name: {
            demandOption: true,
            describe: 'User full name',
            type: 'string'
        },
        email: {
            demandOption: true,
            describe: 'User email address',
            type: 'string'
        },
        telp: {
            demandOption: true,
            describe: 'User phone number',
            type: 'string'
        },
        role: {
            demandOption: true,
            describe: 'User Role',
            type: 'string'
        },
        status: {
            demandOption: true,
            describe: 'User Status',
            type: 'boolean'
        },
    }, (argv) => {
        const data = fs.readFileSync('users.json')
        const parsedUsers = JSON.parse(data)

        if (!validateName(argv.name)) return
        if (!validateEmail(argv.email)) return
        if (!validateTelp(argv.telp)) return
        if (!validateStatus(argv.status)) return

        const userNew = {

            name: argv.name,
            email: argv.email,
            telp: argv.telp,
            role: argv.role,
            status: argv.status

        }

        parsedUsers.push(userNew)

        fs.writeFileSync('users.json', JSON.stringify(parsedUsers, null, 2))

    }
    )
    .command('list', 'display list name',
        {}, () => {
            const data = fs.readFileSync('users.json')
            const users = JSON.parse(data)

            users.forEach(user => {
                console.log(`Name : ${user.name}`)
                console.log(`Email : ${user.email}`)
                console.log(`No telp : ${user.telp}`)
                console.log(`Role : ${user.role}`)
                console.log(`Status : ${user.status}`)
                console.log('-'.repeat(30))
            });
        }
    )
    .command('detail', 'display detail user',
        {
            name: {
                demandOption: true,
                describe: 'User full name',
                type: 'string'
            }
        }, (argv) => {
            const data = fs.readFileSync('users.json')
            const users = JSON.parse(data)

            const user = users.find((u) => u.name === argv.name)
            if (user) {
                console.log('Data User ditemukan')
                console.log('-'.repeat(30))
                console.log(`Name : ${user.name}`)
                console.log(`Email : ${user.email}`)
                console.log(`No telp : ${user.telp}`)
                console.log(`Role : ${user.role}`)
                console.log(`Status : ${user.status}`)
            } else {
                console.log('nama user tersebut tidak ada')
            }

        }
    )
    .command('delete', 'delete data user', {
        name: {
            demandOption: true,
            describe: 'User full name',
            type: 'string'
        }
    }, (argv) => {
        const data = fs.readFileSync('users.json')
        const users = JSON.parse(data)

        const user = users.some((u) => u.name === argv.name)

        if (!user) {
            console.log(`Data user ${argv.name} tidak ditemukan`)
            return false
        }

        const dataUser = users.filter((u) => u.name !== argv.name)

        fs.writeFileSync('users.json', JSON.stringify(dataUser, null, 2))

        console.log(`Data user ${argv.name} berhasil dihapus`)
    }
    )
    .command('update', 'Update data user', {
        name: {
            demandOption: true,
            describe: 'User full name',
            type: 'string'
        },
        newName: {
            demandOption: false,
            describe: 'User full name',
            type: 'string'
        },
        email: {
            demandOption: false,
            describe: 'User email address',
            type: 'string'
        },
        telp: {
            demandOption: false,
            describe: 'User phone number',
            type: 'string'
        },
        role: {
            demandOption: false,
            describe: 'User Role',
            type: 'string'
        },
        status: {
            demandOption: false,
            describe: 'User Status',
            type: 'boolean'
        },
    }, (argv) => {
        const data = fs.readFileSync('users.json')
        const users = JSON.parse(data)

        const userIndex = users.findIndex((u) => u.name === argv.name)

        if (userIndex == -1) {
            console.log(`Nama user ${argv.name} tidak ditemukan`)
            return false
        }

        if (argv.newName !== undefined) users[userIndex].name = argv.newName;
        if (argv.email !== undefined) users[userIndex].email = argv.email;
        if (argv.telp !== undefined) users[userIndex].telp = argv.telp;
        if (argv.role !== undefined) users[userIndex].role = argv.role;
        if (argv.status !== undefined) users[userIndex].status = argv.status;

        fs.writeFileSync('users.json', JSON.stringify(users, null, 2))

        console.log(`Data ${argv.name} berhasil di update`)
    }
    )



    .help().argv;

console.log(argv)