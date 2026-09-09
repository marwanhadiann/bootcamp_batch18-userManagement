console.log('='.repeat(30));
console.log('User Management System');
console.log('='.repeat(30))

const user = require('./user')
const fs = require('fs');
// const rl = require('./readline')
const yargs = require('./yargs')
const express = require('./express')

if (!fs.existsSync('users.json')) {
    fs.writeFileSync('users.json', JSON.stringify(user, null, 2))
}

// const users = [
//     {
//         name: 'John Doe',
//         email: 'john@example.com',
//         phone: '08123456789',
//         role: 'admin',
//         status: true
//     },
//     {
//         name: 'Jane Smith',
//         email: 'jane@example.com',
//         phone: '08123456789',
//         role: 'user',
//         status: true
//     },
//     {
//         name: 'Bob Wilson',
//         email: 'bob@example.com',
//         phone: '08123456789',
//         role: 'USER',
//         status: false
//     }
// ]

// fs.writeFileSync('users.json', JSON.stringify(users, null, 2))

// const data = fs.readFileSync('users.json', 'utf-8')
// const parsedUsers = JSON.parse(data)
// console.log (data)
// console.log(parsedUsers)

// function greetUser(userObj) {
//     console.log('---------------------------------------')
    
//     if (!userObj.status){
//         console.log(`${userObj.name} sudah tidak aktif`)
//         return
//     }

    
//     if (userObj.role.toUpperCase() === 'ADMIN') {
//         console.log(`Welcome Back, Admin ${userObj.name}`)
//     } else if (userObj.role.toUpperCase() === 'USER') {
//         console.log(`Hello ${userObj.name}`)
//     }
//     console.log('---------------------------------------')

//     console.log(`Name`.padEnd(7) + `: ${userObj.name}`)
//     console.log(`Email`.padEnd(7) + `: ${userObj.email}`)
//     console.log(`Phone`.padEnd(7) + `: ${userObj.phone}`)
//     console.log(`Role`.padEnd(7) + `: ${userObj.role}`)
//     console.log(userObj.status == true ? `Status`.padEnd(7) + `: Active` : `Status`.padEnd(7) + `: Non-Active`)
// }

// data.forEach(function(user){
//     greetUser(user)
// })