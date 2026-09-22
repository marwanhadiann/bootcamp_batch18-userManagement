const express = require('express');
const fs = require('fs');
const { validateTelp, validateEmail } = require('./validator')
const { getUser, createUser, getEditUsers, updateUsers, deleteUsers, isNameExist } = require('./database');
// const { error, assert } = require('console');
const methodOverride = require('method-override')

const app = express();
const cors = require('cors');
const { error } = require('console');
app.use(cors())

function logger(req, res, next) {
    console.log(`[${req.method}]`, req.url);
    next()
}

app.use(logger)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')

const validateUsers = async (req, res, next) => {
    try {

        const { name, phone, email, role, status } = req.body
        if (!name || !name.trim()) {
            return res.status(400).json({
                field: 'name',
                message: 'Nama wajib diisi'
            })
        }

        if (!phone || !phone.trim()) {
            return res.status(400).json({
                field: 'phone',
                message: 'Phone wajib diisi'
            })
        }

        if (!role || !role.trim()) {
            return res.status(400).json({
                field: 'role',
                message: 'Role wajib dipilih'
            })
        }

        if (!status || !status.trim()) {
            return res.status(400).json({
                field: 'status',
                message: 'Status wajib dipilih'
            })
        }

        const nameExist = await isNameExist(name)
        if (nameExist) {
            return res.status(400).json({
                field: 'name',
                message: 'Nama sudah digunakan'
            })
        }

        const phoneValidate = validateTelp(phone)
        if (!phoneValidate.isValid) {
            return res.status(400).json({
                field: 'phone',
                message: phoneValidate.message
            })
        }

        if (email && email.trim()) {
            const emailValidate = validateEmail(email)
            if (!emailValidate.isValid) {
                return res.status(400).json({
                    field: 'email',
                    message: emailValidate.message
                })
            }
        }


        if (status !== 'true' && status !== 'false') {
            return res.status(400).json({
                field: 'status',
                message: 'Status wajib diisi'
            })
        }

        next()
    } catch (error) {
        console.error(error)

        res.status(500).json({
            field: 'general',
            message: 'Terjadi kesalahan saat melakukan validasi'
        })
    }
}

app.get('/api/users', async (req, res) => {
    try {
        const search = req.query.search || ''
        const users = await getUser(search)

        console.log('query diterima backend: ', search)

        if (search) {
            const cleanSearch = search.trim().toLowerCase()
            const filterUser = users.filter((user) =>
                user && user.name && String(user.name).trim().toLowerCase().includes(cleanSearch)
            )
            console.log('hasil filter:', filterUser.length)
            return res.json(filterUser)
        }
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'database eror'
        })
    }
})

app.post('/api/users', validateUsers, async (req, res) => {
    try {
        // console.log('data dari react:', req.body)
        const {
            name,
            email,
            phone,
            role,
            status
        } = req.body

        const statusBoolean = status === 'true'
        const emailValue = email?.trim() || null

        // console.log('email dari react: ', email)
        // console.log('email dikirim ke database : ', emailValue)

        // console.log('data yg masuk ke db: ', {
        //     name, email, phone, role, statusBoolean
        // })

        const newUser = await createUser(
            name,
            emailValue,
            phone,
            role,
            statusBoolean
        )

        // console.log('hasil insert : ', newUser)
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'database eror'
        })
    }

})

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

app.post('/users/:id/edit', async (req, res) => {
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