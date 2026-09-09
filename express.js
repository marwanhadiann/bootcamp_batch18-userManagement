const express = require('express');
const fs = require('fs');
const { validateName, validateTelp, validateEmail } = require('./validator')

const app = express();

function logger(req, res, next) {
    console.log(`[${req.method}]`, req.url);
    next()
}

app.use(logger)

const validateUsers = (req, res, next) => {
    const name = req.query.name
    const phone = req.query.phone
    const email = req.query.email

    if (!name || !phone) {
        return res.status(400).send('Name and Phone required')
    }

    const nameValidate = validateName(name)
    if (!nameValidate.isValid) {
        return res.status(400).send(nameValidate.message)
    }

    const phoneValidate = validateTelp(phone)
    if (!phoneValidate.isValid) {
        return res.status(400).send(phoneValidate.message)
    }

    if (email != undefined) {
        const emailValidate = validateEmail(email)
        if (!emailValidate.isValid) {
            return res.status(400).send(emailValidate.message)
        }
    }

    next()
}
app.get('/addusers', validateUsers, (req, res) => {
    const { name, phone, email = undefined } = req.query

    const data = fs.readFileSync('users.json', 'utf-8')
    const parsedUsers = JSON.parse(data)
    const newData = {
        name: name,
        email: email,
        telp: phone
    }

    // console.log(`data sebelum ${parsedUsers}`)

    parsedUsers.push(newData)

    fs.writeFileSync('users.json', JSON.stringify(parsedUsers, null, 2))

    // console.log(`data sesudah ${parsedUsers}`)
    return res.status(201).send('User Succesfully Created')
})

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Users Management System')
})


app.get('/users', (req, res) => {
    const data = fs.readFileSync('users.json', 'utf-8')
    const users = JSON.parse(data)
    res.render('users', { users })
})

app.get('/contact', (req, res,) => {
    res.send('Users Management System - Contact')
})

app.get('/about', (req, res,) => {
    res.send('Users Management System - About')
})

app.use((req, res) => {
    const url = req.url
    res.render('404', { url })
})

app.listen(3000, () => {
    console.log('Server Berjalan di http://localhost:3000')
})


// module.export = app