const express = require('express');
const fs = require('fs');
const { validateName, validateTelp, validateEmail } = require('./validator')
const { getUser, createUser, getEditUsers, updateUsers, deleteUsers } = require('./database');
const { error } = require('console');
const methodOverride = require('method-override')

const app = express();

function logger(req, res, next) {
    console.log(`[${req.method}]`, req.url);
    next()
}

app.use(logger)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

const validateUsers = (req, res, next) => {
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email

    if (!name || !phone) {
        return res.status(400).send('Name and Phone wajib diisi')
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
app.get('/users/add', (req, res) => {
    res.render('addusers', { error: null })
})

app.post('/users', validateUsers, async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            role,
            status
        } = req.body

        await createUser(
            name,
            email,
            phone,
            role,
            status
        )

        res.redirect('/users')
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Database Error')
    }
})

app.get('/users/:id/edit', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getEditUsers(id)

        if (!user) {
            return res.status(400).send('User tidak ditemukan')
        }

        res.render('editusers', { user })
    } catch (error) {
        console.error(error)
        res.status(500).send('Database Error')
    }
})

app.post('/users/:id/edit', validateUsers, async (req, res) => {
    try {
        const id = req.params.id
        const {
            name,
            email,
            phone,
            role,
            status
        } = req.body

        await updateUsers(
            id,
            name,
            email,
            phone,
            role,
            status
        )

        res.redirect('/users')
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Database Error')
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await deleteUsers(id)

        if (!deletedUser) {
            return res.status(400).send('Data user tidak ditemukan')
        }

        res.redirect('/users')

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Database Error')
    }
})

app.get('/', (req, res) => {
    res.render('homepage')
})


app.get('/users', async (req, res) => {
    try {
        const users = await getUser()
        res.render('users', { users })
    } catch (error) {
        console.log(error)
        res.status(500).send('Database Error')
    }

})

app.get('/contact', (req, res,) => {
    res.render('contact')
})

app.get('/about', (req, res,) => {
    res.render('about')
})

app.use((req, res) => {
    const url = req.url
    res.render('404', { url })
})

app.listen(3000, () => {
    console.log('Server Berjalan di http://localhost:3000')
})


module.exports = app